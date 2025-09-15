# Markdown Content System for website

## 🎉 Complete System Successfully Implemented!

This Next.js + Tailwind project now supports a comprehensive Markdown content system with hierarchical organization, dynamic routing, and GitHub Pages deployment.

## 📁 Complete File Structure

```
website/
├── content/
│   ├── posts/                  # Blog articles
│   │   ├── az-104-week-1.md
│   │   └── home-security-lab.md
│   ├── projects/               # Project showcases
│   │   ├── network-traffic-analyzer.md
│   │   └── vulnerability-scanner.md
│   └── learning/               # Structured learning content
│       ├── az-104/             # Azure AZ-104 certification journey
│       │   ├── overview.md
│       │   ├── week-1.md
│       │   └── week-2.md
│       ├── appsec-labs/        # Application Security labs
│       │   ├── overview.md
│       │   └── sql-injection-lab.md
│       ├── devsecops/          # DevSecOps practices
│       │   ├── overview.md
│       │   └── pipeline-security.md
│       └── malware-reversing/  # Malware analysis content
│           ├── overview.md
│           └── static-analysis.md
├── lib/
│   ├── posts.ts               # Complete content processing utilities
│   └── base-path.ts           # Path utilities for deployment
├── components/
│   ├── markdown-content.tsx   # Enhanced Markdown renderer
│   └── navigation.tsx         # Site navigation with proper routing
├── app/
│   ├── blog/
│   │   ├── page.tsx          # Blog listing with Markdown integration
│   │   └── [slug]/
│   │       └── page.tsx      # Dynamic blog post pages
│   ├── projects/
│   │   ├── page.tsx          # Projects showcase listing
│   │   └── [slug]/
│   │       └── page.tsx      # Dynamic project pages
│   └── learning/
│       ├── page.tsx          # Learning journeys hub
│       └── [journey]/
│           ├── page.tsx      # Journey overview pages
│           └── [slug]/
│               └── page.tsx  # Individual learning posts
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages deployment
├── public/
│   ├── CNAME                 # Custom domain configuration
│   └── .nojekyll            # Prevent Jekyll processing
└── next.config.mjs          # Static export configuration
```

## 🔧 Dependencies Added

- `gray-matter` - Parse frontmatter from Markdown files
- `react-markdown` - Render Markdown as React components
- `remark-gfm` - GitHub Flavored Markdown support
- `@tailwindcss/typography` - Beautiful typography styles
- `rehype-highlight` - Syntax highlighting for code blocks
- `rehype-slug` - Generate slugs for headings

## 📝 Comprehensive Frontmatter Schema

### Blog Posts (`content/posts/`)
```yaml
---
title: "Post Title"
description: "Brief description for SEO and listing pages"
date: "2024-01-15"
tags: ["cybersecurity", "azure", "tutorial"]
author: "Dan Elliott"
published: true
---
```

### Projects (`content/projects/`)
```yaml
---
title: "Project Name"
description: "Project description and key features"
date: "2024-01-15"
tags: ["security", "tool", "python"]
author: "Dan Elliott"
published: true
github: "https://github.com/username/repo"  # Optional
demo: "https://demo-url.com"                # Optional
tech: ["Python", "Flask", "SQLite"]        # Technologies used
---
```

### Learning Content (`content/learning/[journey]/`)
```yaml
---
title: "Learning Topic Title"
description: "Description of the learning content"
date: "2024-01-15"
tags: ["azure", "certification", "cloud"]
author: "Dan Elliott"
published: true
journey: "az-104"                           # Journey identifier
order: 1                                    # Order within journey
status: "completed"                         # completed, in-progress, planned
---
```

# Your Markdown Content

Write your post content here using standard Markdown syntax.

## Code Blocks

```javascript
console.log("Code blocks are highlighted!");
```

## Lists, Links, and More

- All standard Markdown features are supported
- [Links](https://example.com) work perfectly
- **Bold** and *italic* text
- > Blockquotes for emphasis
```

## 🚀 How to Use

### Adding Blog Posts

1. Create a new `.md` file in `content/posts/`
2. Add frontmatter with title, date, tags, and description
3. Write your content in Markdown below the frontmatter
4. The post will automatically appear on `/blog` and be accessible at `/blog/[filename]`

### Adding Projects

1. Create a new `.md` file in `content/projects/`
2. Follow the same frontmatter format
3. The project will appear on `/projects` and be accessible at `/projects/[filename]`

## 🎨 Features

### ✅ What's Working
- ✅ Frontmatter parsing with gray-matter
- ✅ Markdown rendering with react-markdown
- ✅ GitHub Flavored Markdown (tables, task lists, etc.)
- ✅ Syntax highlighting for code blocks
- ✅ Dynamic routes for posts and projects
- ✅ Automatic post/project listing pages
- ✅ Beautiful typography styling
- ✅ Responsive design
- ✅ Dark theme compatible
- ✅ SEO-friendly metadata generation

### 🎯 Dynamic Routes
- `/blog` - Lists all blog posts sorted by date (newest first)
- `/blog/[slug]` - Individual blog post pages
- `/projects` - Lists all projects sorted by date (newest first)
- `/projects/[slug]` - Individual project pages

### 🎨 Styling
- Uses Tailwind's typography plugin for beautiful reading experience
- Dark theme with emerald accent colors
- Responsive design that works on all devices
- Syntax highlighted code blocks
- Hover effects and smooth transitions

## 📄 Example Files Created

I've created several example files to demonstrate the system:

### Blog Posts
1. **AZ-104 Week 1** (`content/posts/az-104-week-1.md`)
   - Azure certification learning journey
   - Resource groups and VMs tutorial

2. **Building a Home Security Lab** (`content/posts/home-security-lab.md`)
   - Security lab setup guide
   - Network architecture and tools

### Projects
1. **Network Traffic Analyzer** (`content/projects/network-traffic-analyzer.md`)
   - Python-based network monitoring tool
   - Technical implementation details

2. **Automated Vulnerability Scanner** (`content/projects/vulnerability-scanner.md`)
   - Web application security scanner
   - Comprehensive project documentation

## 🛠️ Technical Implementation

### Core Functions (`lib/posts.ts`)
- `getAllPosts()` - Get all blog posts sorted by date
- `getAllProjects()` - Get all projects sorted by date
- `getPostBySlug(slug)` - Get individual post by filename
- `getProjectBySlug(slug)` - Get individual project by filename

### Markdown Renderer (`components/markdown-content.tsx`)
- Client-side rendering with react-markdown
- Custom code block styling
- Typography-optimized layout
- Emerald theme integration

### Dynamic Pages
- Static generation at build time for better performance
- Automatic SEO metadata from frontmatter
- 404 handling for non-existent posts/projects

## 🚀 Getting Started

1. **Add your first blog post:**
   ```bash
   # Create a new file
   touch content/posts/my-first-post.md
   ```

2. **Add frontmatter and content:**
   ```markdown
   ---
   title: "My First Blog Post"
   date: "2025-09-15"
   tags: ["getting-started", "blog"]
   description: "My very first blog post on this new platform!"
   ---

   # Welcome to My Blog

   This is my first post using the new Markdown system!
   ```

3. **Visit your blog:**
   - Go to `http://localhost:3000/blog` to see the post listed
   - Click on it to view the full post at `/blog/my-first-post`

## 📊 Development Server

The development server is currently running at:
- **Local:** http://localhost:3000
- **Blog:** http://localhost:3000/blog
- **Projects:** http://localhost:3000/projects

## 🎯 Next Steps

You can now:
1. Add your own Markdown files to `content/posts/` and `content/projects/`
2. Customize the styling in the component files
3. Add more fields to the frontmatter schema
4. Extend the functionality with categories, search, etc.

The system is production-ready and will work perfectly with static site generation when you deploy!
