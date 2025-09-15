---
title: "My First CTF: A Comedy of Errors"
date: "2025-09-05"
tags: ["CTF", "Learning", "Pentesting", "Beginner"]
description: "How I spent 6 hours on a 'beginner' challenge, learned about rabbit holes, and discovered that Google is indeed a valid hacking tool."
category: "Fails"
featured: false
readTime: "7 min read"
---

# My First CTF: A Comedy of Errors

Picture this: It's Friday night, I've got my energy drinks ready, and I'm about to dominate my first Capture The Flag (CTF) competition. Six hours later, I'm questioning my life choices, wondering why "admin:admin" doesn't work on everything, and realizing that maybe—just maybe—I should have practiced before jumping into a competition.

## The Setup

### My Confidence Level: ████████░░ 80%
**My Reasoning:**
- "I've watched tons of YouTube videos"
- "How hard can it be?"
- "It's a beginner CTF"
- "I know basic Linux commands"

### My Actual Skill Level: ██░░░░░░░░ 20%
**Reality Check:**
- Never touched Burp Suite
- Thought SQL injection was just `' OR 1=1`
- Didn't know what base64 encoding looked like
- Had never heard of steganography

## Challenge 1: "Easy" Web Exploitation

### The Challenge
```
Find the flag hidden in this login page.
URL: http://ctf.example.com/login
```

### My Approach (Hour 1)
```bash
# My sophisticated attack strategy
Username: admin
Password: admin

Username: admin
Password: password

Username: admin  
Password: 123456

Username: root
Password: toor
```

**Result:** 🚫 Access Denied (shocking, I know)

### What I Should Have Done
```bash
# View page source (duh!)
curl -s http://ctf.example.com/login | grep -i flag

# Or just inspect element...
<!-- TODO: Remove test credentials admin:temp123 -->
```

**The flag was literally in the HTML comments.** 🤦‍♂️

## Challenge 2: "Simple" Cryptography

### The Challenge
```
Decode this message:
VGhpcyBpcyBub3QgdGhlIGZsYWc=
```

### My 2-Hour Journey Down Rabbit Holes

**Hour 1: Caesar Cipher Attempts**
```python
# I wrote an entire Caesar cipher decoder
def caesar_decode(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            # ... 20 lines of unnecessary code
    return result

# Tried every shift from 1 to 25
for i in range(1, 26):
    print(f"Shift {i}: {caesar_decode(message, i)}")
```

**Hour 2: ROT13, Atbash, and Other Ciphers**
```bash
# I even tried Morse code
echo "VGhpcyBpcyBub3QgdGhlIGZsYWc=" | morse-decoder
# (This tool doesn't exist, but I tried anyway)
```

### The Moment of Truth
```bash
# My girlfriend walked by and said:
# "That looks like base64"

echo "VGhpcyBpcyBub3QgdGhlIGZsYWc=" | base64 -d
# Output: This is not the flag

# ... well, at least I learned what base64 looks like
```

## Challenge 3: Steganography Nightmare

### The Challenge
```
There's something hidden in this image.
[Download: cute_cat.jpg]
```

### My Descent into Madness

**Initial Attempts:**
```bash
# I spent an hour staring at this cat picture
# Looking for visual clues
# Adjusting brightness and contrast
# Even tried printing it out (yes, really)
```

**Tool Discovery Phase:**
```bash
# Finally discovered steganography tools
strings cute_cat.jpg | grep -i flag
# Nothing...

exiftool cute_cat.jpg
# Metadata shows nothing interesting

binwalk cute_cat.jpg
# No embedded files
```

**The Breakthrough:**
```bash
# After Googling "hidden data in images CTF"
steghide extract -sf cute_cat.jpg
# "Enter passphrase:"
# Tries: password, admin, cat, cute, flag, ctf...

# Finally tried empty passphrase (just pressed Enter)
# A wild flag.txt appears!
```

**The flag was embedded with no password.** 🤯

## Challenge 4: Binary Exploitation (aka My Breaking Point)

### The Challenge
```
Exploit this binary to get the flag.
./vulnerable_program
```

### My Attempt
```bash
# My sophisticated binary analysis
file vulnerable_program
# Output: ELF 64-bit LSB executable

# My debugging approach
./vulnerable_program
# Segmentation fault

# My "exploit"
./vulnerable_program AAAAAAAAAAAAAAAAAAAAAAAAA
# Still segmentation fault, but longer!
```

### What I Learned (Later)
```bash
# Proper approach (learned this weeks later)
checksec vulnerable_program
gdb ./vulnerable_program
(gdb) disas main
(gdb) run $(python -c "print('A' * 100)")
(gdb) info registers

# Buffer overflow exploitation requires actual knowledge
# Who would have thought? 🤷‍♂️
```

## The Scorecard

### Final Results After 6 Hours
- **Challenges Solved:** 1 out of 15
- **Ranking:** 247th out of 250 participants
- **Ego:** Thoroughly bruised
- **Learning:** Immense

### What Actually Happened
```
Hour 1: ░░░░░░░░░░ 0% - "This is harder than expected"
Hour 2: ██░░░░░░░░ 20% - "Maybe I should read writeups"
Hour 3: ██░░░░░░░░ 20% - "Google is my best friend"
Hour 4: ███░░░░░░░ 30% - "Oh, that's what base64 looks like"
Hour 5: ████░░░░░░ 40% - "Steganography is a thing"
Hour 6: ████░░░░░░ 40% - "I need to practice more"
```

## Lessons Learned (The Hard Way)

### 1. RTFM (Read The Fine Manual)
```bash
# Before CTF: "Documentation is for losers"
# After CTF: "Why didn't I read the manual?"

man base64
man strings
man exiftool
```

### 2. Basic Tools Are Your Friends
```bash
# Essential CTF toolkit (that I wish I knew about)
curl                 # Web requests
strings              # Extract strings from files
file                 # Identify file types
base64               # Encode/decode base64
exiftool             # Image metadata
steghide             # Steganography
nc                   # Network connections
```

### 3. Google-Fu Is a Skill
```bash
# Bad search: "how to hack"
# Good search: "CTF steganography tools linux"
# Better search: "extract hidden data from jpeg file CTF"
```

### 4. View Source, Always
```html
<!-- I missed so many flags in HTML comments -->
<!-- flag{always_check_the_source} -->
<!-- TODO: Remove debug info: admin_panel.php -->
```

### 5. Try the Obvious First
```bash
# My complex approach:
# 1. Advanced exploitation techniques
# 2. Custom scripts
# 3. Overthinking everything

# What actually works:
# 1. admin:admin
# 2. Check robots.txt
# 3. Try empty passwords
# 4. Look for .bak files
```

## What I Did Right (Surprisingly)

### 1. I Didn't Give Up
Even after failing spectacularly, I kept trying. Persistence is key in cybersecurity.

### 2. I Took Notes
```bash
# My chaotic notes from that night:
- base64 ends with = sometimes
- check HTML source ALWAYS
- steghide exists
- strings command is useful
- Google is a hacking tool
```

### 3. I Asked for Help
The CTF community is incredibly helpful. When I asked "How do I approach steganography?", I got detailed explanations and tool recommendations.

## The Aftermath

### My Study Plan (Born from Humiliation)
```bash
# Week 1-2: Web Application Basics
- OWASP Top 10
- Burp Suite tutorials
- SQL injection practice

# Week 3-4: Cryptography Fundamentals
- Base64, ROT13, Caesar cipher
- Hash identification
- Basic crypto challenges

# Week 5-6: Steganography & Forensics
- steghide, binwalk, strings
- File format analysis
- Metadata examination

# Week 7-8: Binary Exploitation (maybe?)
- GDB basics
- Buffer overflow concepts
- Assembly reading (slowly)
```

### Tools I Wish I Had Known About
```bash
# Web
curl, wget, burpsuite, dirb, gobuster

# Crypto  
cyberchef, hashcat, john

# Steganography
steghide, binwalk, strings, exiftool

# General
file, hexdump, nc, python
```

## Six Months Later

### My Second CTF Results
- **Challenges Solved:** 8 out of 15
- **Ranking:** 45th out of 200 participants
- **Ego:** Recovering nicely
- **Addiction to CTFs:** Confirmed

### What Changed
1. **Practiced regularly** on platforms like picoCTF and OverTheWire
2. **Built a proper toolkit** instead of googling tools mid-competition
3. **Learned to recognize patterns** (base64, hashes, common encodings)
4. **Joined a team** - collaboration makes everything better

## CTF Survival Guide for Beginners

### Before Your First CTF
```bash
# Practice platforms
- picoCTF (beginner-friendly)
- OverTheWire (great wargames)
- HackTheBox (when you're ready)
- TryHackMe (guided learning)
```

### Essential Tools Setup
```bash
# Install these before competing
sudo apt update
sudo apt install curl wget netcat strings file exiftool
pip install pwntools
# Download Burp Suite Community Edition
```

### During the Competition
1. **Read challenges carefully** - the clues are usually there
2. **Start with "easy" challenges** - build confidence first
3. **Check common locations** - robots.txt, source code, .git folders
4. **Google everything** - it's not cheating, it's research
5. **Take breaks** - frustrated debugging helps nobody

### CTF Mindset
```python
def ctf_approach(challenge):
    if looks_impossible:
        return "It's probably easier than it looks"
    
    if solved_quickly:
        return "Double-check, it might be a red herring"
        
    if stuck_for_hours:
        return "Step back, read the challenge again"
```

## Key Takeaways

1. **Everyone starts somewhere** - even security experts were beginners once
2. **Failure is the best teacher** - my humiliation taught me more than any tutorial
3. **Community matters** - don't be afraid to ask questions
4. **Practice makes progress** - not perfection, but definitely progress
5. **Google is indeed a hacking tool** - embrace it

## Resources That Saved My Sanity

- [picoCTF](https://picoctf.org/) - Perfect for beginners
- [CyberChef](https://gchq.github.io/CyberChef/) - The Swiss Army knife of crypto
- [GTFOBins](https://gtfobins.github.io/) - Binary exploitation techniques
- [OverTheWire](https://overthewire.org/) - Wargames for practice
- [CTF Time](https://ctftime.org/) - Find competitions and writeups

---

*Remember: The goal of your first CTF isn't to win—it's to learn where your knowledge gaps are and have fun filling them.*

**P.S.** - That "beginner" CTF? I later found out it was actually intermediate level. The organizers had mislabeled it. My ego feels slightly better now. 😅
