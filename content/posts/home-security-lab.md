---
title: "Building a Home Security Lab"
date: "2025-09-10"
tags: ["Security", "Lab Setup", "Virtualization", "Learning"]
description: "Setting up a home cybersecurity lab for practicing penetration testing and security research."
category: "Security"
featured: true
readTime: "12 min read"
---

# Building a Home Security Lab

After months of theory, it was time to get hands-on with cybersecurity. Here's how I built my home lab for practicing penetration testing and security research.

## Lab Architecture

My lab consists of multiple virtual machines running on VMware Workstation Pro:

### Attack Box
- **Kali Linux** - Primary penetration testing distribution
- **Parrot Security** - Alternative with additional tools
- 4GB RAM, 60GB storage each

### Target Machines
- **Metasploitable 2** - Intentionally vulnerable Linux
- **DVWA** - Damn Vulnerable Web Application
- **Windows 10** - For Windows-specific attacks
- **pfSense** - Firewall and network segmentation

## Network Setup

```
Internet
    |
[pfSense Firewall]
    |
    +-- DMZ Network (192.168.100.0/24)
    |     |
    |     +-- Web Server (DVWA)
    |     +-- Metasploitable 2
    |
    +-- Internal Network (192.168.1.0/24)
          |
          +-- Kali Linux
          +-- Windows 10 Client
```

## Essential Tools Installed

### Reconnaissance
- **Nmap** - Network discovery and security auditing
- **Masscan** - High-speed port scanner
- **Recon-ng** - Web reconnaissance framework

### Vulnerability Assessment  
- **Nessus** - Professional vulnerability scanner
- **OpenVAS** - Open-source vulnerability scanner
- **Nikto** - Web server scanner

### Exploitation
- **Metasploit** - Exploitation framework
- **SQLmap** - SQL injection testing
- **Burp Suite** - Web application security testing

## Key Lessons Learned

### Network Isolation is Critical
- Use separate virtual networks for different security zones
- Never connect vulnerable machines directly to your home network
- Snapshot VMs before making changes

### Documentation Matters
- Keep detailed notes of what you're testing
- Document successful attack paths
- Track which vulnerabilities you've exploited

### Legal and Ethical Considerations
- Only test systems you own or have explicit permission to test
- Don't scan networks you don't control
- Be mindful of your ISP's terms of service

## Sample Attack Scenario

Here's a basic attack chain I practiced:

1. **Reconnaissance**
   ```bash
   nmap -sS -O 192.168.100.0/24
   ```

2. **Vulnerability Scanning**
   ```bash
   nmap --script vuln 192.168.100.10
   ```

3. **Exploitation**
   ```bash
   msfconsole
   use exploit/multi/samba/usermap_script
   set RHOSTS 192.168.100.10
   exploit
   ```

4. **Post-Exploitation**
   - Enumerate users and groups
   - Search for sensitive files
   - Attempt privilege escalation

## Cost Breakdown

- **VMware Workstation Pro**: $250 (one-time)
- **Additional RAM**: $100 (16GB upgrade)
- **Storage**: $80 (1TB SSD)
- **Nessus Professional**: $3,000/year (got student license for free!)

**Total**: ~$430 for a professional-grade lab

## What's Next

- Add more diverse target systems (CentOS, Ubuntu Server)
- Practice with Active Directory environments
- Experiment with container security (Docker, Kubernetes)
- Set up centralized logging with ELK stack

## Resources

- [VulnHub](https://vulnhub.com) - Downloadable vulnerable VMs
- [HackTheBox](https://hackthebox.eu) - Online penetration testing platform
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/) - Web application security lessons

---

*Having a dedicated lab environment has accelerated my learning tremendously. There's nothing quite like breaking into a system you've set up yourself!*
