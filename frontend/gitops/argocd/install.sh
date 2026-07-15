#!/usr/bin/env bash
# =============================================================================
# ArgoCD Bootstrap Script
# Run this ONCE after your EKS cluster is up and kubectl is configured.
#
# Prerequisites:
#   - kubectl configured (aws eks update-kubeconfig --name <cluster> --region ap-south-1)
#   - argocd CLI installed (brew install argocd  OR  choco install argocd)
#   - helm installed
#
# Usage:
#   chmod +x install.sh
#   GMAIL_USER=you@gmail.com GMAIL_APP_PASSWORD=xxxx ./install.sh
# =============================================================================

set -euo pipefail

ARGOCD_VERSION="v2.11.3"   # Pin to stable version
ARGOCD_NAMESPACE="argocd"
APP_EMAIL="${GMAIL_USER:?Set GMAIL_USER env var}"
APP_PASSWORD="${GMAIL_APP_PASSWORD:?Set GMAIL_APP_PASSWORD env var}"
NOTIFY_EMAIL="${NOTIFY_EMAIL:-$GMAIL_USER}"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   ArgoCD Bootstrap — VTU Results Monorepo    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Step 1: Create namespaces ──────────────────────────────────────────────────
echo "📁 Creating namespaces..."
kubectl apply -f namespace.yaml
kubectl create namespace staging    --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace production --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# ── Step 2: Install ArgoCD ────────────────────────────────────────────────────
echo ""
echo "🚀 Installing ArgoCD ${ARGOCD_VERSION}..."
kubectl apply -n "${ARGOCD_NAMESPACE}" \
  -f "https://raw.githubusercontent.com/argoproj/argo-cd/${ARGOCD_VERSION}/manifests/install.yaml"

echo "⏳ Waiting for ArgoCD server to be ready..."
kubectl rollout status deployment/argocd-server -n "${ARGOCD_NAMESPACE}" --timeout=300s

# ── Step 3: Install ArgoCD Notifications controller ───────────────────────────
echo ""
echo "📧 Installing ArgoCD Notifications controller..."
kubectl apply -n "${ARGOCD_NAMESPACE}" \
  -f "https://raw.githubusercontent.com/argoproj-labs/argocd-notifications/stable/manifests/install.yaml"

# ── Step 4: Configure Gmail notifications ────────────────────────────────────
echo ""
echo "📧 Configuring Gmail notifications..."

# Create/update notifications secret with real credentials
kubectl create secret generic argocd-notifications-secret \
  --from-literal=email-username="${APP_EMAIL}" \
  --from-literal=email-password="${APP_PASSWORD}" \
  --namespace="${ARGOCD_NAMESPACE}" \
  --dry-run=client -o yaml | kubectl apply -f -

# Apply notifications ConfigMap (templates + triggers)
kubectl apply -f notifications-config.yaml

echo "   ✅ Gmail notifications configured for: ${NOTIFY_EMAIL}"

# ── Step 5: Apply ArgoCD Application CRDs ────────────────────────────────────
echo ""
echo "📋 Applying ArgoCD Applications (staging + production)..."
kubectl apply -f app-staging.yaml
kubectl apply -f app-production.yaml

# ── Step 6: Get initial admin password ───────────────────────────────────────
echo ""
echo "🔐 Retrieving ArgoCD initial admin password..."
ARGOCD_PASSWORD=$(kubectl get secret argocd-initial-admin-secret \
  -n "${ARGOCD_NAMESPACE}" \
  -o jsonpath='{.data.password}' | base64 --decode)

# ── Step 7: Port-forward (local access) ──────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ ArgoCD Bootstrap Complete!                           ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                                                          ║"
echo "║  Access ArgoCD UI (port-forward):                        ║"
echo "║    kubectl port-forward svc/argocd-server 8080:443       ║"
echo "║    -n argocd                                             ║"
echo "║    Open: https://localhost:8080                          ║"
echo "║                                                          ║"
echo "║  Username : admin                                        ║"
echo "║  Password : ${ARGOCD_PASSWORD}                           ║"
echo "║                                                          ║"
echo "║  Applications:                                           ║"
echo "║    staging    → auto-sync ✅                            ║"
echo "║    production → manual sync ⚠️                          ║"
echo "║                                                          ║"
echo "║  To deploy to production:                                ║"
echo "║    argocd app sync vtu-frontend-production               ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# ── Step 8: Login to argocd CLI ──────────────────────────────────────────────
echo "Logging in to ArgoCD CLI..."
kubectl port-forward svc/argocd-server -n "${ARGOCD_NAMESPACE}" 8080:443 &
PF_PID=$!
sleep 3

argocd login localhost:8080 \
  --username admin \
  --password "${ARGOCD_PASSWORD}" \
  --insecure

kill $PF_PID 2>/dev/null || true

echo ""
echo "✅ Done! ArgoCD is watching your repo."
echo "   Next: push a change to frontend/ and watch staging auto-sync."
