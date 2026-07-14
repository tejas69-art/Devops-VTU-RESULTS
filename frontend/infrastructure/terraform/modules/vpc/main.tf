# ─── VPC Module ───────────────────────────────────────────────────────────────
# Creates a production-grade VPC with:
#   - 3 public subnets (for ALB, NAT GW)
#   - 3 private subnets (for EKS nodes)
#   - NAT Gateway (one per AZ for HA, single for cost savings)
#   - Internet Gateway
#   - Route tables
# ─────────────────────────────────────────────────────────────────────────────

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.project_name}-vpc"
    Environment = var.environment
    # Required tags for AWS Load Balancer Controller
    "kubernetes.io/cluster/${var.project_name}-cluster" = "shared"
  }
}

# ─── Internet Gateway ─────────────────────────────────────────────────────────

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

# ─── Public Subnets (for ALB + NAT GW) ───────────────────────────────────────

resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name        = "${var.project_name}-public-${var.availability_zones[count.index]}"
    Environment = var.environment
    # Required for AWS Load Balancer Controller (internet-facing ALB)
    "kubernetes.io/role/elb"                                        = "1"
    "kubernetes.io/cluster/${var.project_name}-cluster"             = "shared"
  }
}

# ─── Private Subnets (for EKS worker nodes) ───────────────────────────────────

resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 10)
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name        = "${var.project_name}-private-${var.availability_zones[count.index]}"
    Environment = var.environment
    # Required for AWS Load Balancer Controller (internal ALB)
    "kubernetes.io/role/internal-elb"                               = "1"
    "kubernetes.io/cluster/${var.project_name}-cluster"             = "shared"
  }
}

# ─── Elastic IPs for NAT Gateways ─────────────────────────────────────────────

resource "aws_eip" "nat" {
  count  = 1 # Single NAT GW (cost-optimized); use length(var.availability_zones) for HA
  domain = "vpc"

  tags = {
    Name = "${var.project_name}-nat-eip-${count.index}"
  }

  depends_on = [aws_internet_gateway.main]
}

# ─── NAT Gateway ──────────────────────────────────────────────────────────────

resource "aws_nat_gateway" "main" {
  count = 1 # Single NAT GW for cost optimization

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "${var.project_name}-nat-${count.index}"
  }

  depends_on = [aws_internet_gateway.main]
}

# ─── Route Tables ─────────────────────────────────────────────────────────────

# Public Route Table → Internet Gateway
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Private Route Table → NAT Gateway
resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[0].id
  }

  tags = {
    Name = "${var.project_name}-private-rt-${count.index}"
  }
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}
