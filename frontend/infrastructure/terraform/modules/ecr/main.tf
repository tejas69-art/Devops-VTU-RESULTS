# ─── ECR Module ───────────────────────────────────────────────────────────────
# Creates an ECR repository for the Docker image with:
#   - Lifecycle policy to keep last 10 tagged images
#   - Image scanning on push
#   - AES-256 encryption
# ─────────────────────────────────────────────────────────────────────────────

resource "aws_ecr_repository" "app" {
  name                 = var.project_name
  image_tag_mutability = "MUTABLE" # Allow :latest + versioned tags

  image_scanning_configuration {
    scan_on_push = true # Automatic vulnerability scan on every push
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = "${var.project_name}-ecr"
    Environment = var.environment
  }
}

# ─── Lifecycle Policy ─────────────────────────────────────────────────────────
# Keeps last 10 tagged images (production releases)
# Automatically expires untagged images after 7 days

resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 tagged images"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["v"]
          countType     = "imageCountMoreThan"
          countNumber   = 10
        }
        action = { type = "expire" }
      },
      {
        rulePriority = 2
        description  = "Remove untagged images after 7 days"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 7
        }
        action = { type = "expire" }
      },
      {
        rulePriority = 3
        description  = "Keep last 5 staging images"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["staging-"]
          countType     = "imageCountMoreThan"
          countNumber   = 5
        }
        action = { type = "expire" }
      }
    ]
  })
}

# ─── Backend ECR Repository ───────────────────────────────────────────────────
# Creates a separate ECR repository for the Backend Docker image.

resource "aws_ecr_repository" "backend" {
  name                 = "vtu-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name        = "vtu-backend-ecr"
    Environment = var.environment
  }
}

resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy     = aws_ecr_lifecycle_policy.app.policy
}
