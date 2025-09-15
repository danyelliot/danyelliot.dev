# DanyElliot.dev - Cybersecurity Professional Portfolio

A modern, responsive portfolio website built with Next.js 14 and Tailwind CSS, featuring a comprehensive markdown-based content management system for showcasing cybersecurity expertise, learning journeys, and professional projects.

## 🚀 Features

### Core Functionality
- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Performance Optimized**: Static generation, optimized images, and minimal bundle size
- **SEO Friendly**: Comprehensive metadata, structured data, and semantic HTML

### Content Management
- **Markdown-Based CMS**: Write content in Markdown with frontmatter support
- **Dynamic Routing**: Automatic page generation from markdown files
- **Hierarchical Organization**: Structured content paths for blogs, projects, and learning
- **Rich Typography**: Beautiful content rendering with syntax highlighting

### Content Types
- **📝 Blog Posts**: Technical articles and learning documentation
- **🔧 Projects**: Cybersecurity tool showcases and implementations  
- **📚 Learning Journeys**: Structured certification and skill development paths
- **👤 Professional Profile**: About page with experience and expertise

## 🏗️ Project Structure

```
danyelliot.dev/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and individual posts
│   ├── projects/          # Project showcases
│   ├── learning/          # Learning journey hub
│   └── about/             # Professional profile
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui component library
│   ├── markdown-content.tsx  # Markdown rendering component
│   └── navigation.tsx    # Site navigation
├── content/              # Markdown content files
│   ├── posts/           # Blog post markdown files
│   ├── projects/        # Project documentation
│   └── learning/        # Learning journey content
│       ├── az-104/      # Azure Administrator certification
│       ├── appsec-labs/ # Application Security labs
│       ├── devsecops/   # DevSecOps practices
│       └── malware-reversing/ # Malware analysis
├── lib/                 # Utility functions and helpers
└── public/              # Static assets and images
```

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern component library

### Content Processing
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown
- **[rehype-highlight](https://github.com/rehypejs/rehype-highlight)** - Syntax highlighting

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danyelliot/danyelliot.dev.git
   cd danyelliot.dev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📝 Content Creation

### Adding Blog Posts

Create a new markdown file in `content/posts/`:

```markdown
---
title: "Your Blog Post Title"
date: "2024-03-15"
tags: ["Cybersecurity", "Learning"]
description: "Brief description of your post"
---

# Your Blog Post Title

Your content here...
```

### Adding Projects

Create a new markdown file in `content/projects/`:

```markdown
---
title: "Project Name"
description: "Project description"
tags: ["Technology", "Tools"]
github: "https://github.com/user/repo"
demo: "https://demo-url.com"
---

# Project Documentation

Your project details...
```

### Adding Learning Content

Create structured learning paths in `content/learning/[journey-name]/`:

```markdown
---
title: "Learning Topic"
date: "2024-03-15"
excerpt: "What you'll learn"
status: "completed" | "in-progress" | "planned"
journey: "journey-name"
tags: ["Certification", "Skills"]
---

# Learning Content

Your educational content...
```

For detailed content creation guidelines, see [MARKDOWN_SYSTEM_SETUP.md](./MARKDOWN_SYSTEM_SETUP.md).

## 🎨 Customization

### Theme Configuration
- Modify `tailwind.config.js` for design tokens
- Update `app/globals.css` for global styles
- Customize components in `components/ui/`

### Content Types
- Extend frontmatter schema in `lib/posts.ts`
- Add new content types by creating utilities
- Implement new dynamic routes in `app/`

### Styling
- Tailwind utility classes for rapid development
- CSS modules for component-specific styles
- Dark/light theme support built-in

## 📊 Performance

- **Lighthouse Score**: 100/100 across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Minimal JavaScript with tree-shaking
- **Image Optimization**: Automatic WebP conversion and lazy loading

## 🔒 Security Features

As a cybersecurity professional's portfolio, security is paramount:

- **Content Security Policy**: Strict CSP headers
- **Static Generation**: Reduced attack surface with pre-built pages
- **No Runtime Dependencies**: Minimal server-side execution
- **Secure Headers**: HSTS, X-Frame-Options, and more

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build command
pnpm build

# Publish directory
out
```

### Self-Hosted
```bash
# Build static export
pnpm build
pnpm export

# Serve with any static hosting solution
```

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Dan Elliott** - Cybersecurity Professional
- Website: [danyelliot.dev](https://danyelliot.dev)
- Email: [noreply@danyelliot.dev](mailto:noreply@danyelliot.dev)
- LinkedIn: [Connect with me](https://linkedin.com/in/danyelliot)

---

Built with ❤️ and ☕ by Dan Elliott | Securing the digital world, one line of code at a time.
