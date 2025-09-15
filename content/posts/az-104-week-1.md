---
title: "AZ-104 Week 1 - Resource Groups & VMs"
date: "2025-09-15"
tags: ["Azure", "Cloud", "Learning Journey"]
description: "Practicing basic Azure administration with VM creation and NSG configuration."
category: "Learning"
featured: false
readTime: "8 min read"
---

# AZ-104 Week 1: Resource Groups & VMs

This week I started my AZ-104 certification journey, focusing on the fundamentals of Azure resource management and virtual machines.

## What I Learned

### Resource Groups
- Resource groups are logical containers for Azure resources
- They help organize and manage resources that share the same lifecycle
- You can't nest resource groups within other resource groups
- Resources can be moved between resource groups (with some limitations)

### Virtual Machines
- Created my first Windows Server 2019 VM
- Learned about VM sizes and their pricing implications
- Configured Network Security Groups (NSGs) for basic firewall rules

## Hands-on Labs

### Lab 1: Create a Resource Group
```bash
# Using Azure CLI
az group create --name "rg-learning-eastus" --location "East US"
```

### Lab 2: Deploy a Virtual Machine
- Used the Azure Portal to create a Windows Server 2019 VM
- Configured RDP access through NSG rules
- Set up a simple web server using IIS

## Key Takeaways

1. **Always plan your resource naming convention** - It gets messy fast without one
2. **NSG rules are stateful** - Return traffic is automatically allowed
3. **VM costs can add up quickly** - Remember to shut down VMs when not in use

## Next Week's Goals

- Dive deeper into Azure Storage accounts
- Learn about Azure Virtual Networks and subnetting
- Practice with Azure PowerShell cmdlets

## Resources

- [Microsoft Learn AZ-104 Path](https://docs.microsoft.com/learn/certifications/azure-administrator/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)

---

*Week 1 of my Azure learning journey complete! The fundamentals are starting to click, but there's so much more to learn.*
