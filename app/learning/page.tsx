import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, CheckCircleIcon, PlayCircleIcon, BookOpenIcon, ArrowRightIcon, ClockIcon } from "lucide-react"
import { getAllLearningPosts } from "@/lib/posts"
import Link from "next/link"

const learningJourneys = [
  {
    id: "az-104",
    title: "AZ-104 Journey",
    description: "Microsoft Azure Administrator certification path with hands-on labs and real-world scenarios.",
    category: "Cloud Security",
    progress: 75,
    status: "in-progress",
    startDate: "2024-01-15",
    estimatedCompletion: "2024-03-30",
    posts: [
      {
        title: "Setting up Azure Lab Environment",
        date: "2024-01-15",
        status: "completed",
        excerpt: "Created a comprehensive lab setup for practicing Azure administration tasks...",
      },
      {
        title: "Identity and Access Management Deep Dive",
        date: "2024-02-01",
        status: "completed",
        excerpt: "Explored Azure AD, RBAC, and conditional access policies in detail...",
      },
      {
        title: "Virtual Networks and Security Groups",
        date: "2024-02-15",
        status: "in-progress",
        excerpt: "Currently working through network security configurations and best practices...",
      },
    ],
    tags: ["Azure", "Cloud", "Certification", "Infrastructure"],
  },
  {
    id: "appsec-labs",
    title: "AppSec Labs",
    description:
      "Application security fundamentals through practical vulnerability research and secure coding practices.",
    category: "Application Security",
    progress: 45,
    status: "in-progress",
    startDate: "2024-02-01",
    estimatedCompletion: "2024-05-15",
    posts: [
      {
        title: "OWASP Top 10 Practical Labs",
        date: "2024-02-01",
        status: "completed",
        excerpt: "Hands-on exploration of the most critical web application security risks...",
      },
      {
        title: "SQL Injection: From Basic to Advanced",
        date: "2024-02-20",
        status: "in-progress",
        excerpt: "Deep dive into SQL injection techniques and prevention strategies...",
      },
    ],
    tags: ["Security", "Web Apps", "OWASP", "Pentesting"],
  },
  {
    id: "malware-reversing",
    title: "Malware & Reversing",
    description: "Reverse engineering and malware analysis using various tools and techniques.",
    category: "Malware Analysis",
    progress: 20,
    status: "planning",
    startDate: "2024-03-01",
    estimatedCompletion: "2024-07-30",
    posts: [
      {
        title: "Setting up Malware Analysis Lab",
        date: "2024-03-01",
        status: "planned",
        excerpt: "Planning the perfect isolated environment for safe malware analysis...",
      },
    ],
    tags: ["Malware", "Reverse Engineering", "Assembly", "Forensics"],
  },
  {
    id: "devsecops",
    title: "DevSecOps Pipeline",
    description: "Building security into the development lifecycle with automated tools and practices.",
    category: "DevSecOps",
    progress: 60,
    status: "in-progress",
    startDate: "2024-01-01",
    estimatedCompletion: "2024-04-15",
    posts: [
      {
        title: "CI/CD Security Integration",
        date: "2024-01-01",
        status: "completed",
        excerpt: "Integrated security scanning tools into GitHub Actions workflows...",
      },
      {
        title: "Container Security Best Practices",
        date: "2024-01-20",
        status: "completed",
        excerpt: "Explored Docker security, image scanning, and runtime protection...",
      },
      {
        title: "Infrastructure as Code Security",
        date: "2024-02-10",
        status: "in-progress",
        excerpt: "Working on Terraform security scanning and policy enforcement...",
      },
    ],
    tags: ["DevOps", "Security", "Automation", "CI/CD"],
  },
]

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircleIcon
    case "in-progress":
      return PlayCircleIcon
    case "planning":
      return BookOpenIcon
    default:
      return BookOpenIcon
  }
}

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Learning <span className="text-primary">Journeys</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Structured paths through certifications, skills, and knowledge areas. Each journey is a collection of
              experiments, failures, and breakthroughs.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Journeys Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {learningJourneys.map((journey) => {
              const StatusIcon = getStatusIcon(journey.status)

              return (
                <Link href={`/learning/${journey.id}`} key={journey.id}>
                  <Card
                    className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer h-full"
                  >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(journey.status)} flex items-center gap-2`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {journey.status.replace("-", " ")}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {journey.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {journey.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {journey.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{journey.progress}%</span>
                      </div>
                      <Progress value={journey.progress} className="h-2" />
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        Started {new Date(journey.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        Est. {new Date(journey.estimatedCompletion).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Recent Posts
                      </h4>
                      <div className="space-y-3">
                        {journey.posts.slice(0, 2).map((post, index) => (
                          <Link href={`/learning/${journey.id}/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} key={index}>
                            <div className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-sm">{post.title}</h5>
                                <Badge
                                  variant={post.status === "completed" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {post.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{post.excerpt}</p>
                              <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {journey.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button variant="ghost" className="w-full">
                      View Journey Details
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Every expert was once a beginner. Every pro was once an amateur.</p>
        </div>
      </footer>
    </div>
  )
}
