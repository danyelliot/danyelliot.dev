import { getProjectBySlug, getAllProjects } from '@/lib/posts'
import { Navigation } from '@/components/navigation'
import { MarkdownContent } from '@/components/markdown-content'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  
  if (!project) {
    return {
      title: 'Project not found',
    }
  }

  return {
    title: project.matter.title,
    description: project.matter.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const formattedDate = new Date(project.matter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6 text-emerald-400 hover:text-emerald-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 text-emerald-400">
            {project.matter.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={project.matter.date}>{formattedDate}</time>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.matter.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-emerald-900/30 text-emerald-300 border-emerald-800">
                {tag}
              </Badge>
            ))}
          </div>
          
          {project.matter.description && (
            <p className="text-lg text-muted-foreground mb-8 border-l-4 border-emerald-400 pl-4 italic">
              {project.matter.description}
            </p>
          )}
        </div>

        <article>
          <MarkdownContent content={project.content} />
        </article>
      </main>
    </div>
  )
}
