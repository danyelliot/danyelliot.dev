---
title: "Infrastructure as Code Security"
date: "2024-02-10"
excerpt: "Working on Terraform security scanning and policy enforcement..."
status: "in-progress"
journey: "devsecops"
tags: ["Terraform", "IaC", "Security", "Policy as Code", "Cloud Security"]
---

# Infrastructure as Code Security

Infrastructure as Code (IaC) has revolutionized how we provision and manage cloud resources, but it also introduces new security challenges. This guide covers comprehensive security practices for IaC, focusing on Terraform, policy enforcement, and secure cloud configurations.

## Why IaC Security Matters

### Traditional Security vs. IaC Security

**Traditional Infrastructure:**
- Manual configuration reviews
- Post-deployment security assessments  
- Reactive security measures
- Limited scalability

**Infrastructure as Code:**
- Security integrated into development workflow
- Pre-deployment security validation
- Automated policy enforcement
- Scalable across environments

### Common IaC Security Risks

1. **Misconfigurations**: Open security groups, public S3 buckets
2. **Hardcoded Secrets**: API keys, passwords in code
3. **Overprivileged Resources**: Excessive IAM permissions
4. **Compliance Violations**: Regulatory requirement breaches
5. **Drift Detection**: Runtime vs. declared state differences

## Terraform Security Fundamentals

### Secure State Management

**Remote State Configuration:**
```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
    
    # Version-controlled state
    versioning = true
    
    # Access logging
    access_logging {
      target_bucket = "terraform-audit-logs"
      target_prefix = "state-access/"
    }
  }
}
```

**State Encryption:**
```hcl
# S3 bucket for state with encryption
resource "aws_s3_bucket" "terraform_state" {
  bucket = "my-terraform-state-bucket"
  
  versioning {
    enabled = true
  }
  
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "aws:kms"
        kms_master_key_id = aws_kms_key.terraform_state.arn
      }
    }
  }
  
  public_access_block {
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
  }
}
```

### Secrets Management

**Using AWS Secrets Manager:**
```hcl
# Retrieve secrets securely
data "aws_secretsmanager_secret" "db_password" {
  name = "prod/database/password"
}

data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = data.aws_secretsmanager_secret.db_password.id
}

# Use in RDS instance
resource "aws_db_instance" "main" {
  identifier = "prod-database"
  
  # Secure password management
  password = jsondecode(data.aws_secretsmanager_secret_version.db_password.secret_string)["password"]
  
  # Encryption at rest
  storage_encrypted = true
  kms_key_id       = aws_kms_key.db_encryption.arn
  
  # Network security
  db_subnet_group_name   = aws_db_subnet_group.private.name
  vpc_security_group_ids = [aws_security_group.database.id]
}
```

**Environment Variables and Locals:**
```hcl
# Never hardcode secrets
locals {
  # Bad - hardcoded secret
  # api_key = "sk-1234567890abcdef"
  
  # Good - from environment or secret management
  api_key = var.api_key != "" ? var.api_key : data.aws_secretsmanager_secret_version.api_key.secret_string
}

variable "api_key" {
  description = "API key for external service"
  type        = string
  sensitive   = true
  default     = ""
}
```

## Security Scanning Tools

### 1. Checkov

**Installation and Basic Usage:**
```bash
# Install Checkov
pip install checkov

# Scan Terraform files
checkov -f main.tf
checkov -d /path/to/terraform/directory

# Output formats
checkov -d . --output json --output-file results.json
checkov -d . --output junit --output-file results.xml
```

**Custom Checkov Policy:**
```python
# custom_checks/S3BucketPublicRead.py
from checkov.common.models.enums import TRUE_VALUES
from checkov.terraform.checks.resource.base_resource_check import BaseResourceCheck


class S3BucketPublicRead(BaseResourceCheck):
    def __init__(self):
        name = "Ensure S3 bucket does not allow public read access"
        id = "CKV_AWS_20"
        supported_resources = ['aws_s3_bucket']
        categories = ['S3']
        super().__init__(name=name, id=id, categories=categories, supported_resources=supported_resources)

    def scan_resource_conf(self, conf):
        """
        Looks for public read access configuration on S3 buckets
        """
        if 'acl' in conf:
            if conf['acl'][0] in ['public-read', 'public-read-write']:
                return CheckResult.FAILED
        return CheckResult.PASSED


check = S3BucketPublicRead()
```

### 2. tfsec

**Installation and Usage:**
```bash
# Install tfsec
brew install tfsec

# Scan current directory
tfsec .

# Specific checks
tfsec --include-passed --format json .

# Exclude specific checks
tfsec --exclude AWS002,AWS003 .
```

**Custom tfsec Rules:**
```rego
# custom_rules/s3_encryption.rego
package tfsec

deny[msg] {
    resource := input.resource.aws_s3_bucket[name]
    not resource.server_side_encryption_configuration
    
    msg := {
        "id": "CUSTOM001", 
        "message": "S3 bucket must have encryption enabled",
        "resource": sprintf("aws_s3_bucket.%s", [name])
    }
}
```

### 3. Terrascan

**Installation and Configuration:**
```bash
# Install Terrascan
curl -L "$(curl -s https://api.github.com/repos/tenable/terrascan/releases/latest | grep -o -E "https://.+?_Linux_x86_64.tar.gz")" > terrascan.tar.gz
tar -xf terrascan.tar.gz terrascan && rm terrascan.tar.gz
sudo mv terrascan /usr/local/bin

# Scan with specific policies
terrascan scan -p aws -t terraform

# Custom policy path
terrascan scan -p aws -t terraform --policy-path ./custom-policies
```

## Policy as Code Implementation

### Open Policy Agent (OPA) with Terraform

**Basic OPA Policy:**
```rego
# policies/terraform.rego
package terraform.security

import future.keywords.in

# Deny S3 buckets with public read access
deny[msg] {
    resource := input.resource.aws_s3_bucket[_]
    resource.acl[_] == "public-read"
    msg := "S3 bucket should not have public read access"
}

# Require encryption for EBS volumes
deny[msg] {
    resource := input.resource.aws_ebs_volume[name]
    not resource.encrypted[_]
    msg := sprintf("EBS volume '%s' must be encrypted", [name])
}

# Ensure RDS instances are not publicly accessible
deny[msg] {
    resource := input.resource.aws_db_instance[name]
    resource.publicly_accessible[_] == true
    msg := sprintf("RDS instance '%s' should not be publicly accessible", [name])
}
```

**Integration with CI/CD:**
```bash
#!/bin/bash
# validate-terraform.sh

# Convert Terraform plan to JSON
terraform plan -out=tfplan
terraform show -json tfplan > plan.json

# Run OPA evaluation
opa eval -d policies/ -i plan.json "data.terraform.security.deny[x]"

# Check exit code
if [ $? -ne 0 ]; then
    echo "Policy violations found!"
    exit 1
fi
```

### Sentinel Policies (Terraform Cloud/Enterprise)

**Cost Control Policy:**
```hcl
# policies/cost-control.sentinel
import "tfplan/v2" as tfplan
import "decimal"

# Calculate total monthly cost
monthly_cost = decimal.new(0)

for tfplan.resource_changes as _, rc {
    if rc.change.actions contains "create" or rc.change.actions contains "update" {
        if rc.type is "aws_instance" {
            instance_type = rc.change.after.instance_type
            
            # Define cost per instance type
            costs = {
                "t3.micro":  8.50,
                "t3.small":  17.00,
                "t3.medium": 34.00,
                "m5.large":  96.00,
            }
            
            if instance_type in costs {
                monthly_cost = decimal.add(monthly_cost, decimal.new(costs[instance_type]))
            }
        }
    }
}

# Policy rule
main = rule {
    decimal.less_than_or_equal_to(monthly_cost, decimal.new(500))
}
```

**Security Policy:**
```hcl
# policies/security.sentinel
import "tfplan/v2" as tfplan

# Find all S3 buckets
s3_buckets = filter tfplan.resource_changes as _, rc {
    rc.type is "aws_s3_bucket" and
    rc.change.actions contains "create"
}

# Ensure no public S3 buckets
public_s3_buckets = filter s3_buckets as _, bucket {
    bucket.change.after.acl is "public-read" or
    bucket.change.after.acl is "public-read-write"
}

main = rule {
    length(public_s3_buckets) is 0
}
```

## Secure CI/CD Pipeline Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/terraform-security.yml
name: Terraform Security Scan

on:
  pull_request:
    paths:
      - 'terraform/**'
  push:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.5.0
      
      - name: Terraform Init
        run: terraform init
        working-directory: ./terraform
      
      - name: Terraform Plan
        run: terraform plan -out=tfplan
        working-directory: ./terraform
        env:
          TF_VAR_api_key: ${{ secrets.API_KEY }}
      
      - name: Run Checkov
        uses: bridgecrewio/checkov-action@master
        with:
          directory: ./terraform
          framework: terraform
          output_format: sarif
          output_file_path: checkov-results.sarif
      
      - name: Run tfsec
        uses: aquasecurity/tfsec-sarif-action@v0.1.4
        with:
          sarif_file: tfsec-results.sarif
      
      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: |
            checkov-results.sarif
            tfsec-results.sarif
      
      - name: Policy Validation with OPA
        run: |
          # Install OPA
          curl -L -o opa https://openpolicyagent.org/downloads/v0.45.0/opa_linux_amd64_static
          chmod +x opa
          
          # Convert plan to JSON
          terraform show -json tfplan > plan.json
          
          # Run policy check
          ./opa eval -d policies/ -i plan.json "data.terraform.security.deny[x]"
        working-directory: ./terraform
```

### GitLab CI Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - security-scan
  - deploy

variables:
  TF_ROOT: ${CI_PROJECT_DIR}/terraform
  TF_ADDRESS: ${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/production

cache:
  key: "${TF_ROOT}"
  paths:
    - ${TF_ROOT}/.terraform

before_script:
  - cd ${TF_ROOT}
  - terraform --version
  - terraform init

validate:
  stage: validate
  script:
    - terraform validate
    - terraform fmt -check

security-scan:
  stage: security-scan
  image: 
    name: bridgecrew/checkov:latest
    entrypoint: [""]
  script:
    - checkov -d ${TF_ROOT} --output cli --output json --output-file checkov-results.json
  artifacts:
    reports:
      junit: checkov-results.json
    when: always

tfsec-scan:
  stage: security-scan
  image:
    name: aquasec/tfsec:latest
    entrypoint: [""]
  script:
    - tfsec ${TF_ROOT} --format json --out tfsec-results.json
  artifacts:
    reports:
      junit: tfsec-results.json
    when: always
```

## Cloud Provider Security Configurations

### AWS Security Best Practices

**VPC and Network Security:**
```hcl
# vpc.tf - Secure VPC configuration
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  # Enable VPC Flow Logs
  enable_flow_log                      = true
  flow_log_destination_type           = "cloud-watch-logs"
  flow_log_cloudwatch_log_group_name  = aws_cloudwatch_log_group.vpc_flow_logs.name
  
  tags = {
    Name        = "main-vpc"
    Environment = var.environment
  }
}

# Private subnets for sensitive resources
resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  
  # Never assign public IPs
  map_public_ip_on_launch = false
  
  tags = {
    Name = "private-subnet-${count.index + 1}"
    Type = "Private"
  }
}

# Security groups with least privilege
resource "aws_security_group" "web" {
  name_prefix = "web-sg"
  vpc_id      = aws_vpc.main.id
  
  # Inbound rules
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS from internet"
  }
  
  ingress {
    from_port   = 80
    to_port     = 80  
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP from internet (redirect to HTTPS)"
  }
  
  # Outbound rules (explicit)
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS to internet"
  }
  
  tags = {
    Name = "web-security-group"
  }
}
```

**IAM Security:**
```hcl
# iam.tf - Secure IAM configurations
data "aws_iam_policy_document" "ec2_assume_role" {
  statement {
    effect = "Allow"
    
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
    
    actions = ["sts:AssumeRole"]
    
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values   = [var.external_id]
    }
  }
}

resource "aws_iam_role" "ec2_role" {
  name               = "ec2-application-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
  
  # Maximum session duration
  max_session_duration = 3600
  
  tags = {
    Environment = var.environment
  }
}

# Least privilege policy
data "aws_iam_policy_document" "ec2_policy" {
  statement {
    effect = "Allow"
    
    actions = [
      "s3:GetObject",
      "s3:PutObject",
    ]
    
    resources = [
      "${aws_s3_bucket.app_data.arn}/*"
    ]
    
    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-server-side-encryption"
      values   = ["AES256"]
    }
  }
  
  statement {
    effect = "Allow"
    
    actions = [
      "secretsmanager:GetSecretValue"
    ]
    
    resources = [
      aws_secretsmanager_secret.app_config.arn
    ]
  }
}
```

### Azure Security Configurations

**Resource Group and Network Security:**
```hcl
# main.tf - Azure security configuration
resource "azurerm_resource_group" "main" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
  
  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "azurerm_network_security_group" "web" {
  name                = "nsg-web"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  security_rule {
    name                       = "AllowHTTPS"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  
  security_rule {
    name                       = "DenyAll"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Storage account with security features
resource "azurerm_storage_account" "main" {
  name                = "st${random_string.storage_suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  
  account_tier             = "Standard"
  account_replication_type = "GRS"
  
  # Security configurations
  enable_https_traffic_only      = true
  min_tls_version               = "TLS1_2"
  allow_nested_items_to_be_public = false
  
  # Network access rules
  network_rules {
    default_action             = "Deny"
    ip_rules                   = var.allowed_ip_ranges
    virtual_network_subnet_ids = [azurerm_subnet.private.id]
  }
  
  blob_properties {
    versioning_enabled = true
    
    delete_retention_policy {
      days = 30
    }
  }
}
```

## Monitoring and Compliance

### Drift Detection

**Terraform Drift Detection Script:**
```bash
#!/bin/bash
# drift-detection.sh

# Set up variables
TERRAFORM_DIR="/path/to/terraform"
SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL}"

cd "${TERRAFORM_DIR}"

# Run terraform plan to detect drift
terraform plan -detailed-exitcode -out=drift-check.tfplan

exit_code=$?

case $exit_code in
  0)
    echo "No changes needed - infrastructure matches configuration"
    ;;
  1)
    echo "Error occurred during terraform plan"
    exit 1
    ;;
  2)
    echo "Infrastructure drift detected!"
    
    # Generate human-readable diff
    terraform show -no-color drift-check.tfplan > drift-details.txt
    
    # Send notification
    curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"🚨 Infrastructure drift detected in ${TERRAFORM_DIR}\"}" \
      "${SLACK_WEBHOOK_URL}"
    
    # Optionally auto-apply if in development environment
    if [[ "${ENVIRONMENT}" == "dev" ]]; then
      echo "Auto-applying changes in development environment"
      terraform apply drift-check.tfplan
    fi
    ;;
esac
```

### Compliance Reporting

**AWS Config Rules for Terraform:**
```hcl
# compliance.tf
resource "aws_config_configuration_recorder" "main" {
  name     = "main-recorder"
  role_arn = aws_iam_role.config.arn
  
  recording_group {
    all_supported                 = true
    include_global_resource_types = true
  }
}

resource "aws_config_config_rule" "s3_bucket_public_access_prohibited" {
  name = "s3-bucket-public-access-prohibited"
  
  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_ACCESS_PROHIBITED"
  }
  
  depends_on = [aws_config_configuration_recorder.main]
}

resource "aws_config_config_rule" "encrypted_volumes" {
  name = "encrypted-volumes"
  
  source {
    owner             = "AWS"
    source_identifier = "ENCRYPTED_VOLUMES"
  }
  
  depends_on = [aws_config_configuration_recorder.main]
}
```

## Advanced Security Patterns

### Multi-Environment Security

**Environment-Specific Configurations:**
```hcl
# environments/dev/terraform.tfvars
environment = "dev"
instance_type = "t3.micro"
backup_retention_days = 7
enable_detailed_monitoring = false

# environments/prod/terraform.tfvars  
environment = "prod"
instance_type = "m5.large"
backup_retention_days = 30
enable_detailed_monitoring = true
```

**Conditional Security Controls:**
```hcl
# main.tf
resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  
  # Enhanced monitoring for production
  monitoring = var.environment == "prod" ? true : false
  
  # Encryption always enabled
  root_block_device {
    encrypted = true
    kms_key_id = aws_kms_key.ebs_encryption.arn
  }
  
  # Security groups based on environment
  vpc_security_group_ids = var.environment == "prod" ? 
    [aws_security_group.web_prod.id] : 
    [aws_security_group.web_dev.id]
}
```

### Zero-Trust Network Architecture

```hcl
# zero-trust.tf
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = [
          "${aws_s3_bucket.app_data.arn}/*"
        ]
        Condition = {
          StringEquals = {
            "aws:PrincipalTag/Department" = "Engineering"
          }
        }
      }
    ]
  })
}

# Private DNS for internal services
resource "aws_route53_zone" "internal" {
  name = "internal.company.com"
  
  vpc {
    vpc_id = aws_vpc.main.id
  }
  
  tags = {
    Environment = var.environment
  }
}
```

## Conclusion

Infrastructure as Code security requires a comprehensive approach that includes:

1. **Secure by Default**: Templates and modules with security built-in
2. **Continuous Scanning**: Automated security checks in CI/CD pipelines  
3. **Policy Enforcement**: Code-based policies for compliance and governance
4. **Monitoring**: Drift detection and compliance reporting
5. **Secrets Management**: Proper handling of sensitive data

The key to successful IaC security is integrating these practices early in the development lifecycle and maintaining them through automated processes.

## Next Steps

- Implement security scanning in your CI/CD pipeline
- Develop custom policies for your organization's requirements
- Set up drift detection and compliance monitoring
- Create security-focused Terraform modules
- Establish security review processes for infrastructure changes

---

*Remember: Security is not a destination but a journey. Continuously improve your IaC security practices as threats and technologies evolve.*
