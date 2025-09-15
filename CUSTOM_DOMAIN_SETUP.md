# GitHub Pages Custom Domain Setup Guide

## 🚨 Current Issue
Your site is deploying to `https://danyelliot.github.io/danyelliot.dev/` instead of `https://danyelliot.dev` because GitHub Pages needs manual configuration for custom domains.

## ✅ What's Already Done
- ✅ CNAME file is correctly configured (`danyelliot.dev`)
- ✅ GitHub Actions workflow is working and deploying
- ✅ Static site is building correctly
- ✅ All content and routing is functional

## 🔧 Required Steps

### 1. Configure GitHub Pages Settings

1. **Go to your GitHub repository**: https://github.com/danyelliot/danyelliot.dev
2. **Click on "Settings"** tab
3. **Scroll down to "Pages"** in the left sidebar
4. **In the "Source" section**: 
   - Select "Deploy from a branch" 
   - OR "GitHub Actions" (recommended since you're using custom workflow)
5. **In the "Custom domain" section**:
   - Enter: `danyelliot.dev`
   - Click "Save"
6. **Check "Enforce HTTPS"** (recommended)

### 2. DNS Configuration Required

You need to configure DNS records with your domain provider for `danyelliot.dev`:

#### Option A: Using GitHub Pages IP Addresses (A Records)
Add these A records to your DNS:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### Option B: Using CNAME (Recommended)
```
Type: CNAME
Name: www
Value: danyelliot.github.io

Type: A
Name: @
Value: 185.199.108.153
(and the other 3 A records above)
```

### 3. Verification Steps

1. **Wait for DNS propagation** (can take up to 24 hours)
2. **Check DNS with**: `dig danyelliot.dev` or use https://whatsmydns.net
3. **Visit**: https://danyelliot.dev
4. **Verify GitHub Pages status** in repository Settings > Pages

### 4. Common Issues & Solutions

#### Issue: "Domain not properly configured"
- **Solution**: Double-check DNS records with your domain provider
- **Check**: Make sure you're using the correct GitHub Pages IP addresses

#### Issue: "Certificate errors"
- **Solution**: Wait for GitHub to provision SSL certificate (can take a few hours)
- **Alternative**: Temporarily uncheck "Enforce HTTPS" until certificate is ready

#### Issue: "404 errors on custom domain"
- **Solution**: Ensure CNAME file contains exactly: `danyelliot.dev` (no protocol, no www)
- **Check**: Verify the CNAME file is in the root of your deployed site

### 5. DNS Provider Specific Instructions

#### Cloudflare
1. Go to DNS tab
2. Add A records pointing to GitHub Pages IPs
3. Set Proxy status to "DNS only" (gray cloud) initially
4. Once working, you can enable proxy (orange cloud) for CDN benefits

#### Namecheap
1. Go to Domain List > Manage
2. Advanced DNS tab
3. Add A records and CNAME as specified above

#### GoDaddy
1. Go to DNS Management
2. Add records as specified above

### 6. Expected Timeline
- **DNS propagation**: 15 minutes to 24 hours
- **GitHub SSL certificate**: 15 minutes to 2 hours
- **Total setup time**: Usually within 1-2 hours

## 🔍 Testing Commands

Once DNS is configured, test with:

```bash
# Check DNS resolution
dig danyelliot.dev

# Check if site responds
curl -I https://danyelliot.dev

# Check SSL certificate
openssl s_client -connect danyelliot.dev:443 -servername danyelliot.dev
```

## 📞 Next Steps

1. **Configure DNS records** with your domain provider
2. **Set custom domain** in GitHub Pages settings
3. **Wait for propagation** (usually 15-60 minutes)
4. **Test the site** at https://danyelliot.dev
5. **Enable HTTPS enforcement** once SSL certificate is provisioned

## 🎉 Success Indicators

You'll know it's working when:
- ✅ `https://danyelliot.dev` loads your site
- ✅ GitHub Pages settings show "Your site is published at https://danyelliot.dev"
- ✅ SSL certificate is valid (green lock in browser)
- ✅ All pages and routes work correctly

---

**Need help?** The GitHub Pages documentation has additional troubleshooting: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
