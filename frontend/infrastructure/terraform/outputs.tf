# ─── Outputs ──────────────────────────────────────────────────────────────────

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "EKS API server endpoint"
  value       = module.eks.cluster_endpoint
  sensitive   = true
}

output "ecr_repository_url" {
  description = "ECR repository URL for Docker image pushes"
  value       = module.ecr.repository_url
}

output "configure_kubectl" {
  description = "Command to configure kubectl to talk to this cluster"
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.eks.cluster_name}"
}

output "aws_account_id" {
  description = "AWS account ID"
  value       = data.aws_caller_identity.current.account_id
}

output "grafana_url" {
  description = "Grafana dashboard URL (after ALB is provisioned)"
  value       = "http://grafana.${var.project_name}.internal — run: kubectl get svc -n monitoring"
}
