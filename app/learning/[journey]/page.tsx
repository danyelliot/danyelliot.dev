import { getLearningJourneySlugs, getAllLearningPosts } from '@/lib/posts'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CalendarIcon, ArrowLeftIcon, CheckCircleIcon, PlayCircleIcon, BookOpenIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface LearningJourneyPageProps {
  params: {
    journey: string
  }
}

const journeyInfo: Record<string, {
  title: string
  description: string
  category: string
  progress: number
  status: string
  startDate: string
  estimatedCompletion: string
  tags: string[]
}> = {
  'az-104': {
    title: 'AZ-104 Journey',
    description: 'Microsoft Azure Administrator certification path with hands-on labs and real-world scenarios.',
    category: 'Cloud Security',
    progress: 75,
    status: 'in-progress',
    startDate: '2024-01-15',
    estimatedCompletion: '2024-03-30',
    tags: ['Azure', 'Cloud', 'Certification', 'Infrastructure']
  },
  'appsec-labs': {
    title: 'AppSec Labs',
    description: 'Application security fundamentals through practical vulnerability research and secure coding practices.',
    category: 'Application Security',
    progress: 45,
    status: 'in-progress',
    startDate: '2024-02-01',
    estimatedCompletion: '2024-05-15',
    tags: ['Security', 'Web Apps', 'OWASP', 'Pentesting']
  },
  'malware-reversing': {
    title: 'Malware & Reversing',
    description: 'Reverse engineering and malware analysis using various tools and techniques.',
    category: 'Malware Analysis',
    progress: 20,
    status: 'planning',
    startDate: '2024-03-01',
    estimatedCompletion: '2024-07-30',
    tags: ['Malware', 'Reverse Engineering', 'Assembly', 'Forensics']
  },
  'devsecops': {
    title: 'DevSecOps Pipeline',
    description: 'Building security into the development lifecycle with automated tools and practices.',
    category: 'DevSecOps',
    progress: 60,
    status: 'in-progress',
    startDate: '2024-01-01',
    estimatedCompletion: '2024-04-15',
    tags: ['DevOps', 'Security', 'Automation', 'CI/CD']
  }
}

export async function generateStaticParams() {
  const journeys = getLearningJourneySlugs()
  return journeys.map((journey) => ({
    journey: journey,
  }))
}

export async function generateMetadata({ params }: LearningJourneyPageProps) {
  const info = journeyInfo[params.journey]
  
  if (!info) {
    return {
      title: 'Learning Journey not found',
    }
  }

  return {
    title: info.title,
    description: info.description,
  }
}

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

export default function LearningJourneyPage({ params }: LearningJourneyPageProps) {
  const info = journeyInfo[params.journey]
  const posts = getAllLearningPosts(params.journey)

  if (!info) {
    notFound()
  }

  const StatusIcon = getStatusIcon(info.status)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/learning">
            <Button variant="ghost" className="mb-6 text-emerald-400 hover:text-emerald-300">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Learning
            </Button>
          </Link>
          
          {/* Journey Header */}
          <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-emerald-400">
                  {info.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {info.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {info.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-emerald-900/30 text-emerald-300 border-emerald-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge className={getStatusColor(info.status)} variant="outline">
                <StatusIcon className="w-4 h-4 mr-1" />
                {info.status.charAt(0).toUpperCase() + info.status.slice(1).replace('-', ' ')}
              </Badge>
            </div>

            {/* Progress and Timeline */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-emerald-400">Progress</h3>
                <div className="flex items-center gap-3">
                  <Progress value={info.progress} className="flex-1" />
                  <span className="text-sm font-medium">{info.progress}%</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-emerald-400">Started</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(info.startDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-emerald-400">Est. Completion</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(info.estimatedCompletion).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">Learning Posts</h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No posts yet for this learning journey.
                </p>
                <p className="text-sm text-muted-foreground">
                  Posts will appear here as I document my progress and learnings.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => {
                  const formattedDate = new Date(post.matter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })

                  const PostStatusIcon = post.matter.status ? getStatusIcon(post.matter.status) : BookOpenIcon

                  return (
                    <Card
                      key={post.slug}
                      className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 group-hover:text-emerald-400 transition-colors">
                              <Link href={`/learning/${params.journey}/${post.slug}`}>
                                {post.matter.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-base">
                              {post.matter.description}
                            </CardDescription>
                          </div>
                          {post.matter.status && (
                            <Badge className={getStatusColor(post.matter.status)} variant="outline">
                              <PostStatusIcon className="w-4 h-4 mr-1" />
                              {post.matter.status.charAt(0).toUpperCase() + post.matter.status.slice(1)}
                            </Badge>
                          )}
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
                          <Link href={`/learning/${params.journey}/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                              Read More
                              <ArrowLeftIcon className="w-4 h-4 ml-1 rotate-180" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
