---
title: "Identity and Access Management Deep Dive"
date: "2024-02-01"
journey: "az-104"
tags: ["Azure", "AAD", "RBAC", "Security"]
description: "Explored Azure AD, RBAC, and conditional access policies in detail."
status: "completed"
---

# Identity and Access Management Deep Dive

Week 3 of my AZ-104 journey focuses on one of the most critical aspects of Azure administration: Identity and Access Management (IAM).

## Azure Active Directory Fundamentals

### Understanding the Hierarchy
```
Tenant (danyelliot.onmicrosoft.com)
├── Subscription (AZ-104-Lab)
│   ├── Resource Group (rg-az104-identity)
│   │   ├── Virtual Machine (vm-lab-eus-dc-01)
│   │   └── Storage Account (stlabeusident01)
│   └── Resource Group (rg-az104-compute)
└── Users and Groups
    ├── Users
    │   ├── admin@danyelliot.onmicrosoft.com
    │   ├── testuser1@danyelliot.onmicrosoft.com
    │   └── testuser2@danyelliot.onmicrosoft.com
    └── Groups
        ├── AZ104-Admins
        └── AZ104-Users
```

## Hands-on Labs Completed

### Lab 1: User and Group Management

#### Creating Users with PowerShell
```powershell
# Connect to Azure AD
Connect-AzureAD

# Create a new user
$passwordProfile = New-Object -TypeName Microsoft.Open.AzureAD.Model.PasswordProfile
$passwordProfile.Password = "TempPassword123!"
$passwordProfile.ForceChangePasswordNextLogin = $true

New-AzureADUser -DisplayName "Test User 1" `
                -UserPrincipalName "testuser1@danyelliot.onmicrosoft.com" `
                -AccountEnabled $true `
                -PasswordProfile $passwordProfile `
                -MailNickName "testuser1"
```

#### Creating Security Groups
```powershell
# Create security groups for RBAC
New-AzureADGroup -DisplayName "AZ104-Admins" `
                 -MailEnabled $false `
                 -SecurityEnabled $true `
                 -MailNickName "az104admins"

New-AzureADGroup -DisplayName "AZ104-Users" `
                 -MailEnabled $false `
                 -SecurityEnabled $true `
                 -MailNickName "az104users"
```

### Lab 2: Role-Based Access Control (RBAC)

#### Built-in Roles Explored
| Role | Scope | Permissions |
|------|-------|-------------|
| Owner | Full access | Can manage everything including access |
| Contributor | Full access except access management | Can manage all resources |
| Reader | Read-only | Can view all resources |
| User Access Administrator | Manage user access | Can manage user access to Azure resources |

#### Custom Role Creation
```json
{
    "Name": "AZ104 Lab Manager",
    "IsCustom": true,
    "Description": "Can manage VMs and storage in AZ104 lab",
    "Actions": [
        "Microsoft.Compute/virtualMachines/*",
        "Microsoft.Storage/storageAccounts/*",
        "Microsoft.Network/virtualNetworks/read",
        "Microsoft.Resources/subscriptions/resourceGroups/read"
    ],
    "NotActions": [
        "Microsoft.Compute/virtualMachines/delete"
    ],
    "AssignableScopes": [
        "/subscriptions/{subscription-id}/resourceGroups/rg-az104-compute",
        "/subscriptions/{subscription-id}/resourceGroups/rg-az104-storage"
    ]
}
```

```bash
# Create the custom role
az role definition create --role-definition az104-lab-manager.json
```

### Lab 3: Conditional Access Policies

#### MFA Policy for Admin Accounts
Created a conditional access policy requiring MFA for all users in the "AZ104-Admins" group:

**Policy Configuration:**
- **Users**: AZ104-Admins group
- **Cloud apps**: All cloud apps
- **Conditions**: Any location
- **Grant controls**: Require MFA
- **Session**: Sign-in frequency every 4 hours

#### Device Compliance Policy
```powershell
# Create device compliance policy (conceptual - requires Intune)
$compliancePolicy = @{
    displayName = "AZ104 Lab Device Compliance"
    description = "Requires devices to be domain-joined and have antivirus"
    passwordRequired = $true
    passwordMinimumLength = 8
    deviceThreatProtectionEnabled = $true
}
```

## Real-World Scenarios Practiced

### Scenario 1: New Employee Onboarding
**Challenge**: Onboard a new developer who needs access to specific resources.

**Solution Steps:**
1. Create user account with temporary password
2. Add to appropriate groups (AZ104-Users)
3. Assign RBAC roles at resource group level
4. Configure conditional access for their location
5. Provide Azure portal training

### Scenario 2: Departing Employee
**Challenge**: Secure offboarding of an employee with admin access.

**Solution Steps:**
1. Disable user account immediately
2. Remove from all groups
3. Revoke all role assignments
4. Audit their recent activity
5. Reset any shared passwords they had access to

### Scenario 3: Third-Party Consultant Access
**Challenge**: Provide temporary access to external consultant.

**Solution Steps:**
1. Create guest user account
2. Assign limited custom role
3. Set access expiration date
4. Require MFA and device compliance
5. Monitor access during engagement

## Service Principal and Managed Identity

### Creating Service Principal for Automation
```bash
# Create service principal for automated scripts
az ad sp create-for-rbac --name "AZ104-Automation" \
                         --role "Contributor" \
                         --scopes "/subscriptions/{subscription-id}/resourceGroups/rg-az104-compute"
```

### Managed Identity for VM
```bash
# Enable system-assigned managed identity on VM
az vm identity assign --name "vm-lab-eus-web-01" \
                      --resource-group "rg-az104-compute"

# Assign role to the managed identity
az role assignment create --assignee $(az vm show --resource-group "rg-az104-compute" \
                                                   --name "vm-lab-eus-web-01" \
                                                   --query identity.principalId --output tsv) \
                          --role "Storage Blob Data Reader" \
                          --scope "/subscriptions/{subscription-id}/resourceGroups/rg-az104-storage"
```

## Azure AD Connect (Hybrid Identity)

### Lab Setup with On-Premises Simulation
1. **Created Domain Controller VM**: Simulated on-premises AD
2. **Installed Azure AD Connect**: Configured password hash synchronization
3. **Tested Synchronization**: Verified users sync to Azure AD

```powershell
# Force Azure AD Connect sync (on-premises)
Start-ADSyncSyncCycle -PolicyType Delta
```

## Monitoring and Auditing

### Azure AD Audit Logs
Key events to monitor:
- User sign-ins and failures
- Role assignments and changes
- Admin activity
- Conditional access policy triggers

### PowerShell for Audit Queries
```powershell
# Get recent sign-in activities
Get-AzureADAuditSignInLogs -Top 50 | Where-Object {$_.CreatedDateTime -gt (Get-Date).AddDays(-7)}

# Get role assignment changes
Get-AzureADAuditDirectoryLogs -Filter "category eq 'RoleManagement'" -Top 50
```

## Common Issues and Solutions

### Issue 1: User Can't Access Resources Despite Role Assignment
**Cause**: Role assignment at wrong scope or inherited deny policy
**Solution**: 
```bash
# Check effective permissions
az role assignment list --assignee user@domain.com --all
```

### Issue 2: Conditional Access Blocking Legitimate Users
**Cause**: Overly restrictive location policies
**Solution**: 
- Add named locations for office IPs
- Create break-glass admin accounts
- Test policies in report-only mode first

### Issue 3: Service Principal Authentication Failures
**Cause**: Expired certificates or client secrets
**Solution**:
```bash
# Check service principal details
az ad sp show --id {app-id} --query "passwordCredentials[].endDate"
```

## Key Takeaways

1. **Principle of Least Privilege**: Always start with minimal permissions
2. **Regular Reviews**: Audit access rights quarterly
3. **Automation**: Use PowerShell/CLI for consistent configurations
4. **Documentation**: Keep detailed records of custom roles and policies
5. **Testing**: Always test access changes in non-production first

## Cost Implications

| Feature | Cost | Notes |
|---------|------|-------|
| Azure AD Free | $0 | Basic user/group management |
| Azure AD Premium P1 | $6/user/month | Conditional access, self-service |
| Azure AD Premium P2 | $9/user/month | Identity protection, PIM |

## Next Week: Virtual Networks

With IAM foundation solid, next week focuses on:
- VNet creation and configuration
- Subnetting strategies
- Network Security Groups
- VNet peering and gateways

## Study Resources Used

- **Microsoft Learn**: Azure AD fundamentals path
- **Azure Documentation**: RBAC best practices
- **Pluralsight**: Azure Identity and Access Management
- **YouTube**: John Savill's Azure AD series

---

*Understanding Azure IAM is crucial for any Azure administrator. The hands-on practice with users, groups, RBAC, and conditional access has built a solid foundation for the rest of my AZ-104 journey.*
