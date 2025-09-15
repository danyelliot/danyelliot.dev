import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ArrowRightIcon, TagIcon } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-emerald-400">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on cybersecurity, development, and learning in public
            </p>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6">
            {posts.map((post) => {
              const formattedDate = new Date(post.matter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <Card
                  key={post.slug}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-emerald-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.matter.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.matter.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <time dateTime={post.matter.date}>{formattedDate}</time>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.matter.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                          Read More
                          <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
