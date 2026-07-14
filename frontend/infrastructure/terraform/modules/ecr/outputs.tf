output "repository_url" {
  description = "ECR repository URL (use for docker push)"
  value       = aws_ecr_repository.app.repository_url
}

output "repository_arn" {
  description = "ECR repository ARN"
  value       = aws_ecr_repository.app.arn
}
