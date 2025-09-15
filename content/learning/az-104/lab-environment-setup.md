---
title: "Setting up Azure Lab Environment"
date: "2024-01-15"
journey: "az-104"
tags: ["Azure", "Lab Setup", "Environment"]
description: "Created a comprehensive lab setup for practicing Azure administration tasks."
status: "completed"
---

# Setting up Azure Lab Environment

Welcome to the first post in my AZ-104 certification journey! Today I'll walk you through setting up a proper Azure lab environment for learning and practicing.

## Why a Dedicated Lab Environment?

When studying for Azure certifications, having a proper lab environment is crucial:

- **Cost Control**: Separate subscription for learning resources
- **Safety**: No risk of affecting production resources
- **Freedom**: Ability to experiment without constraints
- **Organization**: Clear separation of learning vs. real work

## Lab Architecture

Here's the architecture I've set up for my AZ-104 studies:

### Resource Groups Structure
```
rg-az104-networking    (Virtual networks, subnets, NSGs)
rg-az104-compute       (VMs, availability sets, scale sets)
rg-az104-storage       (Storage accounts, file shares)
rg-az104-identity      (Testing AAD integration)
rg-az104-monitoring    (Log Analytics, monitoring solutions)
```

### Naming Convention
I'm using a consistent naming convention throughout:

```
{resource-type}-{environment}-{location}-{purpose}-{instance}

Examples:
- vm-lab-eus-web-01
- vnet-lab-eus-hub-01
- st-lab-eus-data-01
```

## Initial Setup Steps

### 1. Create a New Subscription
```bash
# Using Azure CLI
az account list --output table
az account set --subscription "AZ-104-Lab"
```

### 2. Set Up Resource Groups
```bash
# Create all resource groups
az group create --name "rg-az104-networking" --location "East US"
az group create --name "rg-az104-compute" --location "East US"
az group create --name "rg-az104-storage" --location "East US"
az group create --name "rg-az104-identity" --location "East US"
az group create --name "rg-az104-monitoring" --location "East US"
```

### 3. Budget Setup
Critical for avoiding surprise bills:

```bash
# Create a budget for the lab
az consumption budget create \
  --budget-name "AZ104-Lab-Budget" \
  --amount 100 \
  --time-grain Monthly \
  --time-period start-date=2024-01-01
```

## Cost Management Tips

### Resource Shutdown Schedule
- **VMs**: Auto-shutdown at 7 PM daily
- **SQL Databases**: Use Basic tier for testing
- **Storage**: Use LRS instead of GRS for lab data

### PowerShell Script for Daily Cleanup
```powershell
# Stop all VMs in lab resource groups
Get-AzVM | Where-Object {$_.ResourceGroupName -like "*az104*"} | Stop-AzVM -Force
```

## Tools and Extensions

### Visual Studio Code Extensions
- **Azure Account**: Manage subscriptions
- **Azure Resources**: Browse and manage resources
- **Azure CLI Tools**: Syntax highlighting for CLI commands

### PowerShell Modules
```powershell
Install-Module -Name Az -AllowClobber -Scope CurrentUser
Install-Module -Name AzureAD
```

### Useful CLI Commands
```bash
# Quick status check
az vm list --query "[].{Name:name, PowerState:powerState}" --output table

# Resource group cleanup
az group delete --name "rg-test" --yes --no-wait
```

## Security Considerations

### Network Security
- All VMs behind NSGs with minimal required ports
- No public IPs unless absolutely necessary
- Jump box for administrative access

### Identity and Access
- Separate admin account for lab activities
- MFA enabled on all accounts
- Regular access reviews

### Monitoring Setup
```bash
# Create Log Analytics workspace
az monitor log-analytics workspace create \
  --resource-group "rg-az104-monitoring" \
  --workspace-name "law-az104-lab"
```

## Learning Resources Integration

### Documentation
- Personal OneNote for lab notes
- GitHub repo for scripts and templates
- Draw.io for architecture diagrams

### Practice Labs
- Microsoft Learn sandbox environments
- Pluralsight hands-on labs
- A Cloud Guru labs

## Next Steps

With the lab environment ready, here's what's coming next:

1. **Week 2**: Virtual networking deep dive
2. **Week 3**: Virtual machines and availability
3. **Week 4**: Storage accounts and file services
4. **Week 5**: Azure Active Directory integration

## Cost Summary - Week 1

| Resource Type | Cost | Notes |
|---------------|------|-------|
| Virtual Machines | $15.30 | 2x B1s VMs running 8h/day |
| Storage | $2.40 | Standard LRS accounts |
| Networking | $1.20 | VNet peering costs |
| **Total** | **$18.90** | Well under budget! |

## Lessons Learned

1. **Start Small**: Don't over-provision resources initially
2. **Automation is Key**: Scripts save time and ensure consistency
3. **Monitor Costs Daily**: Azure Cost Management alerts are essential
4. **Document Everything**: You'll forget the details otherwise

---

*This lab setup will serve as the foundation for my entire AZ-104 journey. Having a consistent, well-organized environment makes all the difference when studying for Azure certifications.*
