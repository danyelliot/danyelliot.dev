import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRightIcon,
  ShieldIcon,
  BrainIcon,
  CodeIcon,
  BookOpenIcon,
  FlaskConicalIcon,
  PenToolIcon,
} from "lucide-react"

const categories = [
  {
    title: "Learning Journeys",
    description: "Certifications, skill paths, and structured learning adventures",
    icon: BookOpenIcon,
    href: "/learning",
    tags: ["AZ-104", "AppSec", "Malware Analysis", "DevSecOps"],
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Projects & Experiments",
    description: "Labs, code demos, and things I built while learning",
    icon: FlaskConicalIcon,
    href: "/projects",
    tags: ["Security Tools", "AI Demos", "Web Apps", "Scripts"],
    gradient: "from-accent/20 to-accent/5",
  },
  {
    title: "Blog",
    description: "Random thoughts, epic fails, and lessons learned",
    icon: PenToolIcon,
    href: "/blog",
    tags: ["Reflections", "Tutorials", "Fails", "Insights"],
    gradient: "from-chart-3/20 to-chart-3/5",
  },
]

const skills = [
  { name: "Security", icon: ShieldIcon },
  { name: "AI", icon: BrainIcon },
  { name: "DevSecOps", icon: CodeIcon },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-balance">
                <span className="text-foreground">Dany</span> <span className="text-primary glow-text">Elliot</span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto leading-relaxed">
              Just someone who keeps asking <span className="text-primary font-semibold">"why"</span> — exploring
              Security, AI, and whatever breaks.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="px-4 py-2 text-sm font-medium bg-secondary/50 hover:bg-secondary/80 transition-colors"
                >
                  <skill.icon className="w-4 h-4 mr-2" />
                  {skill.name}
                </Badge>
              ))}
            </div>

            {/* CTA Button */}
            <Button size="lg" className="font-semibold group" asChild>
              <Link href="/learning">
                Start Exploring
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What You'll Find Here</h2>
            <p className="text-lg text-muted-foreground text-balance">
              A collection of learning adventures, experiments, and thoughts from someone who can't stop tinkering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full group/btn" asChild>
                    <Link href={category.href}>
                      Explore
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with curiosity and caffeine. Always learning, always breaking things.
          </p>
        </div>
      </footer>
    </div>
  )
}
