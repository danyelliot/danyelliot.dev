import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, PlayIcon, ShieldIcon, BrainIcon, CodeIcon, TerminalIcon, CalendarIcon } from "lucide-react"
import { getAllProjects } from "@/lib/posts"
import Link from "next/link"

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-primary text-primary-foreground"
    case "in-progress":
      return "bg-accent text-accent-foreground"
    case "planning":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Security Tools":
      return ShieldIcon
    case "AI Security":
      return BrainIcon
    case "DevSecOps":
      return CodeIcon
    case "Network Security":
      return TerminalIcon
    default:
      return CodeIcon
  }
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  // Fallback content if no markdown projects exist
  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-emerald-400">Projects</h1>
              <p className="text-xl text-muted-foreground">
                No projects found. Add Markdown files to <code className="text-emerald-300">content/projects/</code> to get started.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Getting Started</h3>
              <p className="text-muted-foreground mb-4">
                Create a new Markdown file in the <code className="text-emerald-300">content/projects/</code> directory with the following frontmatter:
              </p>
              <pre className="bg-slate-800 border border-slate-600 rounded p-4 text-sm text-emerald-300 overflow-x-auto">
{`---
title: "Your Project Title"
date: "2025-09-15"
tags: ["tag1", "tag2"]
description: "Your project description"
category: "Security Tools"
status: "completed"
image: "/placeholder.jpg"
technologies: ["Python", "React"]
features: ["Feature 1", "Feature 2"]
githubUrl: "https://github.com/user/repo"
demoUrl: "https://demo.example.com"
---

# Your Project Content

Write your project details in markdown here...`}
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

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Projects & <span className="text-primary">Experiments</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              A collection of security tools, AI experiments, and automation scripts built while learning and exploring.
              Some work, some don't, all taught me something.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.matter.category || "Security Tools")
              const formattedDate = new Date(project.matter.date).toLocaleDateString()

              return (
                <Card
                  key={project.slug}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-muted/30 overflow-hidden">
                    <img
                      src={project.matter.image || "/placeholder.svg"}
                      alt={project.matter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(project.matter.status || "completed")} variant="secondary">
                        {(project.matter.status || "completed").replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
                        <CategoryIcon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.matter.category || "Project"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formattedDate}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.matter.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.matter.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    {project.matter.technologies && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.matter.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {project.matter.features && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Features</h4>
                        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                          {project.matter.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-primary" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.matter.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.matter.githubUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                          <Link href={project.matter.githubUrl} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                      {project.matter.demoUrl && (
                        <Button variant="default" size="sm" className="flex-1" asChild>
                          <Link href={project.matter.demoUrl} target="_blank" rel="noopener noreferrer">
                            <PlayIcon className="w-4 h-4 mr-2" />
                            Demo
                          </Link>
                        </Button>
                      )}
                      <Link href={`/projects/${project.slug}`}>
                        <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            "The best way to learn is to build something that breaks, then fix it."
          </p>
        </div>
      </footer>
    </div>
  )
}