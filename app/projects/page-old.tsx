import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, PlayIcon, ShieldIcon, BrainIcon, CodeIcon, TerminalIcon } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "security-scanner",
    title: "Web Security Scanner",
    description: "Automated vulnerability scanner for web applications with custom rule engine and detailed reporting.",
    category: "Security Tools",
    status: "completed",
    image: "/cyberpunk-security-scanner-interface.jpg",
    technologies: ["Python", "Flask", "SQLite", "BeautifulSoup"],
    features: ["XSS Detection", "SQL Injection Testing", "CSRF Validation", "Custom Rules"],
    githubUrl: "https://github.com/danyelliot/web-security-scanner",
    demoUrl: null,
    date: "2024-02-15",
    tags: ["Security", "Python", "Web Apps", "Automation"],
  },
  {
    id: "ai-threat-detector",
    title: "AI Threat Detector",
    description:
      "Machine learning model for detecting suspicious network traffic patterns and potential security threats.",
    category: "AI Security",
    status: "in-progress",
    image: "/ai-neural-network-threat-detection-dashboard.jpg",
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    features: ["Real-time Analysis", "Pattern Recognition", "Alert System", "Custom Training"],
    githubUrl: "https://github.com/danyelliot/ai-threat-detector",
    demoUrl: "https://ai-threat-demo.vercel.app",
    date: "2024-01-20",
    tags: ["AI", "Security", "Machine Learning", "Python"],
  },
  {
    id: "devsecops-pipeline",
    title: "DevSecOps Pipeline Template",
    description:
      "Complete CI/CD pipeline template with integrated security scanning, testing, and deployment automation.",
    category: "DevSecOps",
    status: "completed",
    image: "/devsecops-pipeline-dashboard-with-security-checks.jpg",
    technologies: ["GitHub Actions", "Docker", "Terraform", "SonarQube"],
    features: ["Security Scanning", "Automated Testing", "Infrastructure as Code", "Compliance Checks"],
    githubUrl: "https://github.com/danyelliot/devsecops-template",
    demoUrl: null,
    date: "2024-03-01",
    tags: ["DevSecOps", "CI/CD", "Docker", "Automation"],
  },
  {
    id: "malware-analyzer",
    title: "Malware Analysis Toolkit",
    description: "Collection of tools and scripts for static and dynamic malware analysis in isolated environments.",
    category: "Malware Analysis",
    status: "planning",
    image: "/malware-analysis-tools-interface-dark-theme.jpg",
    technologies: ["Python", "Volatility", "Yara", "Docker"],
    features: ["Static Analysis", "Dynamic Analysis", "Sandbox Environment", "Report Generation"],
    githubUrl: null,
    demoUrl: null,
    date: "2024-03-15",
    tags: ["Malware", "Forensics", "Python", "Security"],
  },
  {
    id: "password-policy-checker",
    title: "Password Policy Checker",
    description:
      "Enterprise-grade password policy validation tool with customizable rules and breach database integration.",
    category: "Security Tools",
    status: "completed",
    image: "/password-security-checker-interface.jpg",
    technologies: ["JavaScript", "Node.js", "React", "MongoDB"],
    features: ["Policy Validation", "Breach Detection", "Strength Analysis", "API Integration"],
    githubUrl: "https://github.com/danyelliot/password-checker",
    demoUrl: "https://password-checker-demo.vercel.app",
    date: "2024-01-10",
    tags: ["Security", "JavaScript", "Web Apps", "API"],
  },
  {
    id: "network-monitor",
    title: "Network Traffic Monitor",
    description: "Real-time network traffic analysis tool with anomaly detection and visualization capabilities.",
    category: "Network Security",
    status: "in-progress",
    image: "/network-traffic-monitoring-dashboard.jpg",
    technologies: ["Python", "Scapy", "Flask", "Chart.js"],
    features: ["Real-time Monitoring", "Anomaly Detection", "Traffic Visualization", "Alert System"],
    githubUrl: "https://github.com/danyelliot/network-monitor",
    demoUrl: null,
    date: "2024-02-28",
    tags: ["Network", "Security", "Python", "Monitoring"],
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
              const CategoryIcon = getCategoryIcon(project.category)

              return (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-muted/30 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(project.status)} variant="secondary">
                        {project.status.replace("-", " ")}
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
                        {project.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Features</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                        {project.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button variant="default" size="sm" className="flex-1" asChild>
                          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <PlayIcon className="w-4 h-4 mr-2" />
                            Demo
                          </Link>
                        </Button>
                      )}
                      {!project.githubUrl && !project.demoUrl && (
                        <Button variant="ghost" size="sm" className="flex-1" disabled>
                          Coming Soon
                        </Button>
                      )}
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
