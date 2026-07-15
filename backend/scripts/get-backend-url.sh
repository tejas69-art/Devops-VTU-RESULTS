#!/usr/bin/env bash
# =============================================================================
# get-backend-url.sh
#
# Discovers the backend API URL from multiple sources (in priority order):
#   1. BACKEND_CUSTOM_DOMAIN env var (if you have a custom domain)
#   2. ECS service → ALB DNS name (auto-discovered from AWS)
#   3. Render.com deployment URL (via Render API)
#
# Outputs:
#   - Prints the URL to stdout
#   - Writes to $GITHUB_OUTPUT (for GitHub Actions step output)
#   - Stores in AWS SSM Parameter Store (for cross-workflow sharing)
#
# Usage (GitHub Actions):
#   - run: bash backend/scripts/get-backend-url.sh
#     env:
#       ECS_CLUSTER: vtu-results-cluster
#       ECS_SERVICE: vtu-backend-service
#       AWS_REGION:  ap-south-1
#       SSM_PARAM:   /vtu/backend/api-url
#       # Optional — set to skip auto-discovery:
#       BACKEND_CUSTOM_DOMAIN: https://api.vtu-results.com
# =============================================================================

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
ECS_CLUSTER="${ECS_CLUSTER:-vtu-results-cluster}"
ECS_SERVICE="${ECS_SERVICE:-vtu-backend-service}"
SSM_PARAM="${SSM_PARAM:-/vtu/backend/api-url}"

BACKEND_URL=""

# ── Priority 1: Custom domain override ────────────────────────────────────────
if [[ -n "${BACKEND_CUSTOM_DOMAIN:-}" ]]; then
  echo "🔗 Using custom domain override: ${BACKEND_CUSTOM_DOMAIN}"
  BACKEND_URL="${BACKEND_CUSTOM_DOMAIN}"

# ── Priority 2: Auto-discover from ECS → ALB ──────────────────────────────────
elif command -v aws &>/dev/null; then
  echo "🔍 Discovering backend URL from ECS service..."

  # Step 1: Get the target group ARN from the ECS service load balancer config
  TARGET_GROUP_ARN=$(aws ecs describe-services \
    --cluster "${ECS_CLUSTER}" \
    --services "${ECS_SERVICE}" \
    --region "${AWS_REGION}" \
    --query 'services[0].loadBalancers[0].targetGroupArn' \
    --output text 2>/dev/null || echo "None")

  if [[ "${TARGET_GROUP_ARN}" != "None" && -n "${TARGET_GROUP_ARN}" ]]; then
    # Step 2: Get the ALB ARN from the target group
    LB_ARN=$(aws elbv2 describe-target-groups \
      --target-group-arns "${TARGET_GROUP_ARN}" \
      --region "${AWS_REGION}" \
      --query 'TargetGroups[0].LoadBalancerArns[0]' \
      --output text 2>/dev/null || echo "None")

    if [[ "${LB_ARN}" != "None" && -n "${LB_ARN}" ]]; then
      # Step 3: Get the DNS name from the ALB
      ALB_DNS=$(aws elbv2 describe-load-balancers \
        --load-balancer-arns "${LB_ARN}" \
        --region "${AWS_REGION}" \
        --query 'LoadBalancers[0].DNSName' \
        --output text 2>/dev/null || echo "")

      if [[ -n "${ALB_DNS}" ]]; then
        BACKEND_URL="https://${ALB_DNS}"
        echo "✅ Discovered ALB URL: ${BACKEND_URL}"
      fi
    fi
  fi

  # Fallback: Try ECS public IP (for services without ALB)
  if [[ -z "${BACKEND_URL}" ]]; then
    echo "⚠️  No ALB found, trying ECS public IP..."
    TASK_ARN=$(aws ecs list-tasks \
      --cluster "${ECS_CLUSTER}" \
      --service-name "${ECS_SERVICE}" \
      --region "${AWS_REGION}" \
      --query 'taskArns[0]' \
      --output text 2>/dev/null || echo "None")

    if [[ "${TASK_ARN}" != "None" && -n "${TASK_ARN}" ]]; then
      ENI_ID=$(aws ecs describe-tasks \
        --cluster "${ECS_CLUSTER}" \
        --tasks "${TASK_ARN}" \
        --region "${AWS_REGION}" \
        --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
        --output text 2>/dev/null || echo "None")

      if [[ "${ENI_ID}" != "None" && -n "${ENI_ID}" ]]; then
        PUBLIC_IP=$(aws ec2 describe-network-interfaces \
          --network-interface-ids "${ENI_ID}" \
          --region "${AWS_REGION}" \
          --query 'NetworkInterfaces[0].Association.PublicIp' \
          --output text 2>/dev/null || echo "")

        if [[ -n "${PUBLIC_IP}" ]]; then
          BACKEND_URL="http://${PUBLIC_IP}:8000"
          echo "⚠️  Using ECS public IP (no ALB): ${BACKEND_URL}"
        fi
      fi
    fi
  fi

# ── Priority 3: Render.com ────────────────────────────────────────────────────
elif [[ -n "${RENDER_API_KEY:-}" ]]; then
  echo "🔍 Discovering backend URL from Render.com..."
  SERVICE_URL=$(curl -sf \
    -H "Authorization: Bearer ${RENDER_API_KEY}" \
    "https://api.render.com/v1/services?name=vtuhub-python&type=web_service&limit=1" \
    | jq -r '.[0].service.serviceDetails.url // empty' 2>/dev/null || echo "")

  if [[ -n "${SERVICE_URL}" ]]; then
    BACKEND_URL="${SERVICE_URL}"
    echo "✅ Render.com URL: ${BACKEND_URL}"
  fi
fi

# ── Validate we got a URL ──────────────────────────────────────────────────────
if [[ -z "${BACKEND_URL}" ]]; then
  echo "❌ Could not discover backend URL from any source!"
  echo "   Set BACKEND_CUSTOM_DOMAIN to override, or ensure ECS/Render is deployed."
  exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  Backend API URL resolved: ${BACKEND_URL}"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── Write to GitHub Actions step output ───────────────────────────────────────
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "backend_url=${BACKEND_URL}" >> "${GITHUB_OUTPUT}"
  echo "✅ Written to GITHUB_OUTPUT"
fi

# ── Store in AWS SSM Parameter Store ──────────────────────────────────────────
if command -v aws &>/dev/null; then
  echo "💾 Storing in SSM: ${SSM_PARAM}"
  aws ssm put-parameter \
    --name "${SSM_PARAM}" \
    --value "${BACKEND_URL}" \
    --type "String" \
    --overwrite \
    --region "${AWS_REGION}" \
    --description "VTU backend API URL — auto-updated by CI/CD on $(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    > /dev/null
  echo "✅ Stored in SSM Parameter Store"
fi

# ── Update GitHub Secret via gh CLI ───────────────────────────────────────────
if command -v gh &>/dev/null && [[ -n "${GH_TOKEN:-}" ]]; then
  echo "🔐 Updating GitHub secret BACKEND_API_URL..."
  gh secret set BACKEND_API_URL \
    --repo "${GITHUB_REPOSITORY}" \
    --body "${BACKEND_URL}"
  echo "✅ GitHub secret BACKEND_API_URL updated to: ${BACKEND_URL}"
else
  echo "⚠️  gh CLI not available or GH_TOKEN not set — skipping GitHub secret update"
  echo "   Secret will be passed as a job output instead"
fi

echo ""
echo "BACKEND_URL=${BACKEND_URL}"
