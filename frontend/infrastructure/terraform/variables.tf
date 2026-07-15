# ─── Input Variables ──────────────────────────────────────────────────────────

variable "aws_region" {
  description = "AWS region to deploy all resources"
  type        = string
  default     = "ap-south-1" # Mumbai — closest to India
}

variable "project_name" {
  description = "Project name prefix for all resources"
  type        = string
  default     = "vtu-results"
}

variable "environment" {
  description = "Deployment environment (staging | production)"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be 'staging' or 'production'."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "cluster_version" {
  description = "EKS Kubernetes version"
  type        = string
  default     = "1.30"
}

variable "node_instance_types" {
  description = "EC2 instance types for EKS worker nodes"
  type        = list(string)
  default     = ["c7i-flex.large"] # Free tier eligible in this account
}

variable "node_desired_size" {
  description = "Desired number of EKS worker nodes"
  type        = number
  default     = 1
}

variable "node_min_size" {
  description = "Minimum number of EKS worker nodes"
  type        = number
  default     = 1
}

variable "node_max_size" {
  description = "Maximum number of EKS worker nodes (for cluster autoscaler)"
  type        = number
  default     = 2
}

variable "grafana_admin_password" {
  description = "Grafana admin password — store in AWS Secrets Manager, not here"
  type        = string
  sensitive   = true
  default     = "" # Override via TF_VAR_grafana_admin_password env var in CI
}
