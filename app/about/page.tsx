import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  MailIcon,
  ShieldIcon,
  BrainIcon,
  CodeIcon,
  BookOpenIcon,
  TargetIcon,
  RocketIcon,
} from "lucide-react"
import Link from "next/link"

const skills = [
  {
    category: "Security",
    icon: ShieldIcon,
    items: [
      "Web Application Security",
      "Network Security",
      "Vulnerability Assessment",
      "Penetration Testing",
      "OWASP Top 10",
    ],
    level: "Intermediate",
  },
  {
    category: "AI & Machine Learning",
    icon: BrainIcon,
    items: ["Python", "TensorFlow", "Scikit-learn", "Threat Detection", "Pattern Recognition"],
    level: "Beginner",
  },
  {
    category: "DevSecOps",
    icon: CodeIcon,
    items: ["CI/CD Pipelines", "Docker", "Terraform", "GitHub Actions", "Security Automation"],
    level: "Intermediate",
  },
  {
    category: "Tools & Technologies",
    icon: BookOpenIcon,
    items: ["Python", "JavaScript", "React", "Node.js", "SQL", "Linux", "Azure", "AWS"],
    level: "Intermediate",
  },
]

const currentGoals = [
  {
    title: "AZ-104 Certification",
    description: "Microsoft Azure Administrator certification to deepen cloud security knowledge",
    target: "Q2 2024",
    progress: 75,
  },
  {
    title: "Advanced Malware Analysis",
    description: "Building expertise in reverse engineering and malware analysis techniques",
    target: "Q3 2024",
    progress: 20,
  },
  {
    title: "Security Research",
    description: "Contributing to open-source security tools and publishing research findings",
    target: "Ongoing",
    progress: 40,
  },
]

const socialLinks = [
  {
    name: "GitHub",
    icon: GithubIcon,
    url: "https://github.com/danyelliot",
    description: "Code repositories and open-source contributions",
  },
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    url: "https://linkedin.com/in/danyelliot",
    description: "Professional network and career updates",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://youtube.com/@danyelliot",
    description: "Security tutorials and learning journey vlogs",
  },
  {
    name: "Email",
    icon: MailIcon,
    url: "mailto:hello@danyelliot.dev",
    description: "Get in touch for collaborations or questions",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                  Know <span className="text-primary">Me</span>
                </h1>
                <p className="text-xl text-muted-foreground text-balance leading-relaxed mb-6">
                  I'm Dany Elliot, a curious learner exploring the intersection of security, AI, and technology. This is
                  my digital lab notebook where I document the journey, share the failures, and celebrate the
                  breakthroughs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    <ShieldIcon className="w-4 h-4 mr-2" />
                    Security Enthusiast
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <BrainIcon className="w-4 h-4 mr-2" />
                    AI Explorer
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    <CodeIcon className="w-4 h-4 mr-2" />
                    DevSecOps Learner
                  </Badge>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/30">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-mono font-bold text-primary">DE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <BookOpenIcon className="w-8 h-8 text-primary" />
              My Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p>
                My journey into cybersecurity started with a simple question: "How do hackers actually do it?" What
                began as curiosity about how systems could be compromised evolved into a passion for understanding both
                the attack and defense sides of the security equation.
              </p>
              <p>
                I believe in learning by doing, failing fast, and sharing the journey. Every vulnerability I discover,
                every tool I build, and every concept I struggle with becomes part of this public learning experiment.
                The goal isn't to appear as an expert, but to document the authentic process of becoming one.
              </p>
              <p>
                When I'm not breaking things in my home lab, you'll find me exploring how AI can enhance security
                operations, automating security processes through DevSecOps practices, or diving deep into malware
                analysis to understand the latest threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <TargetIcon className="w-8 h-8 text-primary" />
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <Card key={skill.category} className="border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <skill.icon className="w-6 h-6 text-primary" />
                        {skill.category}
                      </CardTitle>
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Goals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <RocketIcon className="w-8 h-8 text-primary" />
              Current Goals
            </h2>
            <div className="space-y-6">
              {currentGoals.map((goal) => (
                <Card key={goal.title} className="border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <CardDescription className="mt-2">{goal.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{goal.target}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mb-12 text-balance">
              Always open to connecting with fellow learners, security professionals, and anyone who shares the
              curiosity to understand how things work (and how they break).
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map((link) => (
                <Card
                  key={link.name}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{link.name}</CardTitle>
                    <CardDescription className="text-sm">{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        Connect
                      </Link>
                    </Button>
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
          <p className="text-muted-foreground">"The expert in anything was once a beginner who refused to give up."</p>
        </div>
      </footer>
    </div>
  )
}
