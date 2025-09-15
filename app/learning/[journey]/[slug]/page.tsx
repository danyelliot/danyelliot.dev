import { getLearningPostBySlug, getLearningJourneySlugs, getLearningPostSlugs } from '@/lib/posts'
import { Navigation } from '@/components/navigation'
import { MarkdownContent } from '@/components/markdown-content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ArrowLeftIcon, CheckCircleIcon, PlayCircleIcon, BookOpenIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface LearningPostPageProps {
  params: {
    journey: string
    slug: string
  }
}

const journeyTitles: Record<string, string> = {
  'az-104': 'AZ-104 Journey',
  'appsec-labs': 'AppSec Labs',
  'malware-reversing': 'Malware & Reversing',
  'devsecops': 'DevSecOps Pipeline'
}

export async function generateStaticParams() {
  const journeys = getLearningJourneySlugs()
  const params: { journey: string; slug: string }[] = []
  
  journeys.forEach(journey => {
    const posts = getLearningPostSlugs(journey)
    posts.forEach(post => {
      params.push({
        journey: journey,
        slug: post.replace(/\.md$/, '')
      })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: LearningPostPageProps) {
  const post = getLearningPostBySlug(params.journey, params.slug)
  
  if (!post) {
    return {
      title: 'Learning post not found',
    }
  }

  return {
    title: post.matter.title,
    description: post.matter.description,
  }
}

const getStatusIcon = (status?: string) => {
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

const getStatusColor = (status?: string) => {
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

export default function LearningPostPage({ params }: LearningPostPageProps) {
  const post = getLearningPostBySlug(params.journey, params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.matter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const journeyTitle = journeyTitles[params.journey] || params.journey
  const StatusIcon = getStatusIcon(post.matter.status)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href={`/learning/${params.journey}`}>
            <Button variant="ghost" className="mb-6 text-emerald-400 hover:text-emerald-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to {journeyTitle}
            </Button>
          </Link>
          
          {/* Journey Context */}
          <div className="mb-6">
            <Link href={`/learning/${params.journey}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
              {journeyTitle}
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-emerald-400">
            {post.matter.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.matter.date}>{formattedDate}</time>
            </div>
            {post.matter.status && (
              <Badge className={getStatusColor(post.matter.status)} variant="outline">
                <StatusIcon className="w-4 h-4 mr-1" />
                {post.matter.status.charAt(0).toUpperCase() + post.matter.status.slice(1)}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.matter.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-emerald-900/30 text-emerald-300 border-emerald-800">
                {tag}
              </Badge>
            ))}
          </div>
          
          {post.matter.description && (
            <p className="text-lg text-muted-foreground mb-8 border-l-4 border-emerald-400 pl-4 italic">
              {post.matter.description}
            </p>
          )}
        </div>

        <article>
          <MarkdownContent content={post.content} />
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href={`/learning/${params.journey}`}>
            <Button variant="outline" className="text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to {journeyTitle}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
