variable "project_name" {
  description = "Project name prefix"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of AZs to spread subnets across"
  type        = list(string)
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}
