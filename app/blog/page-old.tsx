import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ArrowRightIcon, TagIcon } from "lucide-react"
import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

// Keep the old hardcoded posts as fallback if no markdown files exist
const fallbackPosts = [
  {
    id: "azure-lab-setup-fail",
    title: "How I Accidentally Deleted My Entire Azure Lab (And What I Learned)",
    excerpt:
      "A cautionary tale about resource groups, automation scripts, and why you should always double-check your PowerShell commands. Spoiler: I didn't.",
    category: "Fails",
    tags: ["Azure", "PowerShell", "Lessons Learned", "Cloud"],
    date: "2024-03-10",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "sql-injection-deep-dive",
    title: "SQL Injection: Beyond the Basics",
    excerpt:
      "Moving past 'OR 1=1' to explore advanced SQL injection techniques, blind injection methods, and how modern frameworks (sometimes) protect us.",
    category: "Security",
    tags: ["SQL Injection", "Web Security", "Pentesting", "OWASP"],
    date: "2024-03-05",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "ai-security-thoughts",
    title: "AI in Cybersecurity: Hype vs Reality",
    excerpt:
      "After building several AI-powered security tools, here's my honest take on what works, what doesn't, and what's just marketing fluff.",
    category: "AI",
    tags: ["AI", "Machine Learning", "Security", "Opinion"],
    date: "2024-02-28",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "devsecops-pipeline-journey",
    title: "Building My First DevSecOps Pipeline",
    excerpt:
      "From manual deployments to fully automated security-integrated CI/CD. The tools, the challenges, and the 'aha!' moments along the way.",
    category: "DevSecOps",
    tags: ["DevSecOps", "CI/CD", "Automation", "Security"],
    date: "2024-02-20",
    readTime: "15 min read",
    featured: false,
  },
  {
    id: "malware-analysis-setup",
    title: "Setting Up a Home Malware Analysis Lab",
    excerpt:
      "Building a safe, isolated environment for malware analysis without breaking the bank or your main computer. VMs, networking, and essential tools.",
    category: "Malware",
    tags: ["Malware Analysis", "Lab Setup", "Virtualization", "Tools"],
    date: "2024-02-15",
    readTime: "18 min read",
    featured: false,
  },
  {
    id: "why-i-started-learning",
    title: "Why I Started This Learning Journey",
    excerpt:
      "The story behind this website, my goals in cybersecurity, and why I decided to learn in public. Plus some thoughts on imposter syndrome.",
    category: "Life",
    tags: ["Personal", "Learning", "Goals", "Motivation"],
    date: "2024-02-01",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "password-security-myths",
    title: "Password Security Myths That Need to Die",
    excerpt:
      "Special characters don't make passwords secure, and other uncomfortable truths about password policies that most organizations get wrong.",
    category: "Security",
    tags: ["Passwords", "Security", "Authentication", "Myths"],
    date: "2024-01-25",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "first-ctf-experience",
    title: "My First CTF: A Comedy of Errors",
    excerpt:
      "How I spent 6 hours on a 'beginner' challenge, learned about rabbit holes, and discovered that Google is indeed a valid hacking tool.",
    category: "Fails",
    tags: ["CTF", "Learning", "Pentesting", "Beginner"],
    date: "2024-01-15",
    readTime: "7 min read",
    featured: false,
  },
]

const categories = ["All", "Security", "AI", "DevSecOps", "Malware", "Fails", "Life"]

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
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

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
                    key={post.id}
                    className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getCategoryColor(post.category)} variant="outline">
                          {post.category}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <TagIcon className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full group/btn">
                        Read More
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
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
                All Posts
              </h2>
              {/* Category Filter - Placeholder for future functionality */}
              <div className="hidden md:flex gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(post.category)} variant="outline">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm">
                        Read
                        <ArrowRightIcon className="ml-1 h-3 w-3" />
                      </Button>
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
