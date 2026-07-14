# Infrastructure Runbook

> **VTU Results Scrapper** — Production DevOps Setup  
> Stack: AWS EKS · Terraform · Helm · Prometheus · Grafana · GitHub Actions

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GitHub Secrets Setup](#github-secrets-setup)
3. [Step 1 — Bootstrap Remote State](#step-1--bootstrap-remote-state)
4. [Step 2 — Provision Infrastructure (Terraform)](#step-2--provision-infrastructure)
5. [Step 3 — Configure kubectl](#step-3--configure-kubectl)
6. [Step 4 — Deploy Monitoring Stack (Helm)](#step-4--deploy-monitoring-stack)
7. [Step 5 — Deploy Application](#step-5--deploy-application)
8. [Step 6 — Access Grafana](#step-6--access-grafana)
9. [CI/CD Pipeline Overview](#cicd-pipeline-overview)
10. [Alert Runbooks](#alert-runbooks)
11. [Tear Down](#tear-down)

---

## Prerequisites

Install these tools locally:

| Tool | Version | Install |
|------|---------|---------|
| AWS CLI | ≥ 2.x | `winget install Amazon.AWSCLI` |
| Terraform | ≥ 1.6 | `winget install Hashicorp.Terraform` |
| kubectl | ≥ 1.28 | `winget install Kubernetes.kubectl` |
| Helm | ≥ 3.14 | `winget install Helm.Helm` |
| Docker | ≥ 24 | Docker Desktop |

Configure AWS CLI:
```bash
aws configure
# Enter: AWS Access Key, Secret Key, ap-south-1, json
```

---

## GitHub Secrets Setup

Go to **GitHub → your repo → Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `AWS_ACCOUNT_ID` | Your 12-digit AWS account ID |
| `KUBECONFIG_STAGING` | `base64 -w0 ~/.kube/config` output |
| `KUBECONFIG_PRODUCTION` | Production kubeconfig (base64) |
| `TF_VAR_GRAFANA_ADMIN_PASSWORD` | Strong Grafana password |
| `SNYK_TOKEN` | (Optional) Snyk API token from snyk.io |

Create GitHub Environments:
- **staging** — no approval required
- **production** — add yourself as required reviewer
- **infrastructure** — add yourself as required reviewer

---

## Step 1 — Bootstrap Remote State

Create S3 bucket and DynamoDB table for Terraform state (one-time setup):

```bash
# Create S3 bucket for Terraform state
aws s3 mb s3://vtu-results-terraform-state --region ap-south-1

# Enable versioning (recover from accidental deletes)
aws s3api put-bucket-versioning \
  --bucket vtu-results-terraform-state \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket vtu-results-terraform-state \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name vtu-results-tf-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-south-1
```

---

## Step 2 — Provision Infrastructure

```bash
cd infrastructure/terraform

# Download the AWS LBC IAM policy (required by EKS module)
curl -o modules/eks/lbc-iam-policy.json \
  https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.7.2/docs/install/iam_policy.json

# Initialize Terraform (downloads providers + configures backend)
terraform init

# Review what will be created (dry-run, no charges)
terraform plan \
  -var="grafana_admin_password=YourStrongPassword123!"

# Apply (creates EKS cluster — takes ~15 minutes)
# ⚠️  EKS costs ~$0.10/hr for control plane
terraform apply \
  -var="grafana_admin_password=YourStrongPassword123!"
```

**Key resources created:**
- VPC with 3 public + 3 private subnets across AZs
- EKS cluster (Kubernetes 1.30)
- 2 node groups: `app` (t3.medium × 2) + `monitoring` (t3.large × 1)
- ECR repository with lifecycle policies
- IAM roles with least-privilege policies

---

## Step 3 — Configure kubectl

```bash
# Get cluster name from Terraform output
CLUSTER_NAME=$(terraform output -raw eks_cluster_name)

# Update local kubeconfig
aws eks update-kubeconfig \
  --region ap-south-1 \
  --name $CLUSTER_NAME

# Verify connection
kubectl cluster-info
kubectl get nodes
```

---

## Step 4 — Deploy Monitoring Stack

```bash
# Add Prometheus Community Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Apply namespaces first
kubectl apply -f infrastructure/k8s/namespaces.yaml

# Install kube-prometheus-stack (Prometheus + Grafana + Alertmanager)
helm upgrade --install kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  --version 58.7.2 \
  --namespace monitoring \
  --values infrastructure/helm/prometheus-values.yaml \
  --values infrastructure/helm/grafana-values.yaml \
  --set grafana.adminPassword="YourStrongPassword123!" \
  --wait --timeout=600s

# Apply custom alert rules
kubectl apply -f infrastructure/helm/alertmanager-rules.yaml

# Verify monitoring stack
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

---

## Step 5 — Deploy Application

```bash
# Create app secrets (replace values)
kubectl create secret generic vtu-results-secrets \
  --from-literal=NEXT_PUBLIC_API_KEY="your-api-key" \
  -n production

kubectl create secret generic vtu-results-secrets \
  --from-literal=NEXT_PUBLIC_API_KEY="your-api-key" \
  -n staging

# Deploy app manifests
kubectl apply -f infrastructure/k8s/app/deployment.yaml
kubectl apply -f infrastructure/k8s/app/service.yaml
kubectl apply -f infrastructure/k8s/app/ingress.yaml

# Watch rollout
kubectl rollout status deployment/vtu-results -n production
kubectl get pods -n production
```

---

## Step 6 — Access Grafana

**Port-forward (local access, no domain needed):**
```bash
kubectl port-forward svc/kube-prometheus-stack-grafana 3001:80 -n monitoring
# Open: http://localhost:3001
# Login: admin / YourStrongPassword123!
```

**Import the custom dashboard:**
1. Go to **Dashboards → Import**
2. Upload `infrastructure/helm/dashboards/nextjs-dashboard.json`
3. Select **Prometheus** as the datasource
4. Click **Import**

**Available dashboards (pre-installed):**
- Kubernetes / Compute Resources / Cluster
- Kubernetes / Compute Resources / Namespace
- Node Exporter / Full
- VTU Results — Application Dashboard ← your custom one

---

## CI/CD Pipeline Overview

```
PR to main
  └── ci.yml
        ├── 🧹 Lint + Type Check (parallel)
        ├── 🏗️  Build Validation  (parallel)
        ├── 🔒 npm audit + Snyk  (parallel)
        ├── 🛡️  Trivy FS scan    (parallel)
        └── 🔦 Lighthouse CI     (after build)

Push to main
  └── cd-staging.yml
        ├── 🐳 Build + Push to ECR (tag: staging-<sha>)
        ├── ⚡ kubectl set image → staging namespace
        └── 💨 Smoke tests (health + metrics + homepage)
              └── Auto-rollback on failure

GitHub Release published (v*)
  └── cd-production.yml
        ├── 🐳 Build + Push to ECR (tag: v* + latest)
        ├── 🏭 Deploy to production [MANUAL APPROVAL REQUIRED]
        │     └── Auto-rollback on health check failure
        └── 📣 Deploy notification

Changes to infrastructure/terraform/**
  └── infra.yml
        ├── 🔍 terraform validate + fmt check
        ├── 📋 terraform plan → PR comment
        └── 🚀 terraform apply [MANUAL APPROVAL REQUIRED]
```

---

## Alert Runbooks

### `AppDown`
- **Severity**: Critical
- **Cause**: Prometheus can't reach the app
- **Action**: `kubectl get pods -n production` → check pod status, logs: `kubectl logs -l app=vtu-results -n production`

### `PodCrashLooping`
- **Severity**: Critical
- **Cause**: App container keeps restarting
- **Action**: `kubectl describe pod <pod-name> -n production` → check OOMKill, missing secrets

### `HighErrorRate`
- **Severity**: Critical
- **Cause**: >5% HTTP 5xx responses for 5 minutes
- **Action**: Check recent deploys, upstream VTU API status

### `HighLatencyP99`
- **Severity**: Warning
- **Cause**: P99 response time > 2 seconds
- **Action**: Check HPA status, VTU API latency: `kubectl get hpa -n production`

### `NodeHighCPU` / `NodeHighMemory`
- **Severity**: Warning
- **Cause**: Node resources > 85%
- **Action**: `kubectl top nodes` → consider scaling node group via Terraform

---

## Tear Down

> [!CAUTION]
> This will destroy ALL infrastructure and data. No recovery.

```bash
cd infrastructure/terraform

# Destroy all AWS resources
terraform destroy \
  -var="grafana_admin_password=anything"

# Optionally remove S3 state bucket
aws s3 rb s3://vtu-results-terraform-state --force
aws dynamodb delete-table --table-name vtu-results-tf-lock --region ap-south-1
```
