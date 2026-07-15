output "repository_url" {
  description = "ECR repository URL (use for docker push)"
  value       = aws_ecr_repository.app.repository_url
}

output "repository_arn" {
  description = "ECR repository ARN"
  value       = aws_ecr_repository.app.arn
}

output "backend_repository_url" {
  description = "Backend ECR repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "backend_repository_arn" {
  description = "Backend ECR repository ARN"
  value       = aws_ecr_repository.backend.arn
}
