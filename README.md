```mermaid
flowchart TD
    %% Define Styles
    classDef aws fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:black;
    classDef k8s fill:#326CE5,stroke:#fff,stroke-width:2px,color:white;
    classDef cicd fill:#2088FF,stroke:#fff,stroke-width:2px,color:white;
    classDef gitops fill:#F4A041,stroke:#fff,stroke-width:2px,color:black;
    classDef monitor fill:#E75128,stroke:#fff,stroke-width:2px,color:white;
    classDef db fill:#336791,stroke:#fff,stroke-width:2px,color:white;
    classDef user fill:#4CAF50,stroke:#fff,stroke-width:2px,color:white;
    
    %% External
    U((fa:fa-users User)):::user
    DNS[fa:fa-globe DNS Provider]
    
    %% AWS & K8s Entry
    ALB[Application Load Balancer]:::aws
    
    %% CI/CD Pipeline
    subgraph CI_CD ["Continuous Integration (GitHub Actions / Jenkins)"]
        direction LR
        CodeQA[Code Quality Analysis]:::cicd
        DepCheck[Dependency Check]:::cicd
        FileScan[File Scan]:::cicd
        Build[Building Docker Image]:::cicd
        Push[Pushing to ECR]:::cicd
        ImgScan[ECR Image Scan - Trivy]:::cicd
        UpdateGit[Updating Deployment File - GitHub]:::cicd
        
        CodeQA --> DepCheck --> FileScan --> Build --> Push --> ImgScan --> UpdateGit
    end

    %% GitOps & ECR
    ECR[(fa:fa-database Amazon ECR)]:::aws
    Push -.-> ECR
    ArgoCD{fa:fa-ship ArgoCD}:::gitops
    UpdateGit --> ArgoCD

    %% Kubernetes Cluster
    subgraph K8S ["Amazon EKS Cluster"]
        direction TB
        Ingress{fa:fa-network-wired Ingress}:::k8s
        
        subgraph Frontend ["Frontend Tier"]
            F_SVC[Service]:::k8s
            F_POD1(Pod):::k8s
            F_POD2(Pod):::k8s
            F_SVC --> F_POD1 & F_POD2
        end
        
        subgraph Backend ["Backend Tier"]
            B_SVC[Service]:::k8s
            B_POD1(Pod):::k8s
            B_POD2(Pod):::k8s
            B_SVC --> B_POD1 & B_POD2
        end
        
        Ingress --> F_SVC
        F_POD1 & F_POD2 --> B_SVC
    end
    
    %% Monitoring
    subgraph Monitoring ["Monitoring Kubernetes"]
        Prometheus((Prometheus)):::monitor
        Grafana((Grafana)):::monitor
    end
    
    K8S -.-> Monitoring

    %% Connections
    U --> DNS --> ALB --> Ingress
    ArgoCD --> K8S
    ECR -.-> K8S
```

# 🚀 VTU Results Platform — DevSecOps & GitOps Architecture

Welcome to the **VTU Results** monorepo! This repository showcases a modern, enterprise-grade cloud-native architecture. We have fully migrated the backend and frontend into an **Amazon EKS (Elastic Kubernetes Service)** cluster using a robust **DevSecOps** and **GitOps** pipeline.

## 🏗️ Architecture Overview

Our infrastructure is entirely defined as code using Terraform and Kubernetes manifests, continuously delivered via ArgoCD.

### The Stack
- **Frontend**: Next.js (React)
- **Backend**: FastAPI (Python)
- **Infrastructure as Code (IaC)**: Terraform
- **Container Orchestration**: Amazon EKS (Kubernetes)
- **GitOps CD**: ArgoCD
- **CI/CD Pipelines**: GitHub Actions & Jenkins
- **Container Registry**: Amazon ECR
- **Routing & Networking**: AWS Application Load Balancer (ALB) Ingress Controller

---

## 🔄 DevSecOps & CI/CD Workflow

We enforce a strict separation of Continuous Integration (CI) and Continuous Deployment (CD) through a true GitOps model.

### 1. Continuous Integration (GitHub Actions)
Whenever a developer pushes code to the `main` branch (or opens a PR):
1. **Linting & Security Checks**: Python (Ruff) and Next.js linters run to verify code quality and catch security vulnerabilities early.
2. **Docker Build**: The application is containerized using Docker.
3. **Registry Push**: The new Docker image is tagged with the unique Git commit SHA and pushed to **Amazon ECR**.
4. **GitOps Manifest Update**: The pipeline uses `kustomize` to update the image tags in the `frontend/gitops/overlays/` directory and commits the new tags back to the repository.

### 2. Continuous Deployment (ArgoCD GitOps)
ArgoCD lives directly inside the EKS cluster and constantly monitors this repository. 
1. **Detection**: ArgoCD detects the new image tag commit made by GitHub Actions.
2. **Synchronization**: 
   - **Staging**: Automatically syncs and rolls out the new Deployment pods.
   - **Production**: Awaits a manual sync approval for safety.
3. **Reconciliation**: If anyone manually modifies the Kubernetes cluster, ArgoCD detects the drift and immediately overwrites the cluster state to match the Git repository.

---

## 🗺️ Monorepo Structure

```text
📦 Devops-VTU-RESULTS
 ┣ 📂 .github/workflows/        # CI pipelines (GitHub Actions)
 ┣ 📂 backend/                  # FastAPI Python Application
 ┃  ┣ 📂 app/                   # API logic & routes
 ┃  ┗ 📜 Dockerfile             # Backend container definition
 ┣ 📂 frontend/                 # Next.js React Application
 ┃  ┣ 📂 app/                   # UI components & pages
 ┃  ┣ 📂 infrastructure/        # Terraform IaC (EKS, ECR, VPC)
 ┃  ┣ 📂 gitops/                # Kubernetes Manifests for ArgoCD
 ┃  ┃  ┣ 📂 base/               # Base Kustomize manifests (Deployments, Services, HPA, Ingress)
 ┃  ┃  ┣ 📂 overlays/           # Env-specific configurations
 ┃  ┃  ┃  ┣ 📂 staging/         # Staging patches (Auto-sync)
 ┃  ┃  ┃  ┗ 📂 production/      # Production patches (Manual sync)
 ┃  ┃  ┗ 📂 argocd/             # ArgoCD Bootstrap scripts & CRDs
 ┃  ┗ 📜 Dockerfile             # Frontend container definition
 ┗ 📜 README.md                 # You are here!
```

---

## 🛠️ Kubernetes Configuration Highlights

- **Horizontal Pod Autoscaling (HPA)**: Both frontend and backend automatically scale their pod counts based on CPU and memory utilization.
- **Application Load Balancer (ALB)**: Traffic is routed into the cluster via an AWS ALB managed automatically by the AWS Load Balancer Controller.
- **Health Probes**: Liveness and Readiness probes ensure traffic is only routed to healthy pods. If a pod crashes, Kubernetes automatically restarts it.
- **Zero-Downtime Rolling Updates**: When ArgoCD deploys a new version, old pods are smoothly drained and terminated only after new pods become healthy.

---

## 🚀 Getting Started (Bootstrap)

To deploy this architecture from scratch:

1. **Infrastructure**: Navigate to `frontend/infrastructure/terraform` and run `terraform apply` to provision the VPC, EKS cluster, and ECR repositories.
2. **ArgoCD**: Authenticate to EKS via `aws eks update-kubeconfig`, then navigate to `frontend/gitops/argocd` and run `bash install.sh` to bootstrap the GitOps operator.
3. **Pipelines**: Trigger the GitHub Actions pipeline to build the initial images and update the Kustomize manifests. ArgoCD will take over from there!
