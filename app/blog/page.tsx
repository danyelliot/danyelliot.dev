import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, ArrowRightIcon, TagIcon } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Security":
      return "bg-primary/10 text-primary border-primary/20"
    case "AI":
      return "bg-accent/10 text-accent border-accent/20"
    case "DevSecOps":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20"
    case "Malware":
      return "bg-chart-4/10 text-chart-4 border-chart-4/20"
    case "Fails":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "Life":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20"
    case "Learning":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export default function BlogPage() {
  const posts = getAllPosts()

  // Fallback content if no markdown posts exist
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-emerald-400">Blog</h1>
              <p className="text-xl text-muted-foreground">
                No blog posts found. Add Markdown files to <code className="text-emerald-300">content/posts/</code> to get started.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Getting Started</h3>
              <p className="text-muted-foreground mb-4">
                Create a new Markdown file in the <code className="text-emerald-300">content/posts/</code> directory with the following frontmatter:
              </p>
              <pre className="bg-slate-800 border border-slate-600 rounded p-4 text-sm text-emerald-300 overflow-x-auto">
{`---
title: "Your Post Title"
date: "2025-09-15"
tags: ["tag1", "tag2"]
description: "Your post description"
category: "Security"
featured: false
readTime: "5 min read"
---

# Your Post Content

Write your markdown content here...`}
              </pre>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const featuredPosts = posts.filter((post) => post.matter.featured)
  const regularPosts = posts.filter((post) => !post.matter.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Blog & <span className="text-primary">Thoughts</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Random thoughts, epic fails, lessons learned, and insights from someone who's still figuring it all out.
              Learning in public, one post at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Featured Posts
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.slug}
                    className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getCategoryColor(post.matter.category || "Blog")} variant="outline">
                          {post.matter.category || "Blog"}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {new Date(post.matter.date).toLocaleDateString()}
                          </div>
                          {post.matter.readTime && (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {post.matter.readTime}
                            </div>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.matter.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.matter.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.matter.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="w-full group/btn">
                          Read More
                          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                {featuredPosts.length > 0 ? "All Posts" : "Recent Posts"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredPosts.length > 0 ? regularPosts : posts).map((post) => (
                <Card
                  key={post.slug}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(post.matter.category || "Blog")} variant="outline">
                        {post.matter.category || "Blog"}
                      </Badge>
                      {post.matter.readTime && (
                        <span className="text-xs text-muted-foreground">{post.matter.readTime}</span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.matter.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.matter.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.matter.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{new Date(post.matter.date).toLocaleDateString()}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm">
                          Read
                          <ArrowRightIcon className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">"Writing is thinking on paper. Blogging is thinking out loud."</p>
        </div>
      </footer>
    </div>
  )
}