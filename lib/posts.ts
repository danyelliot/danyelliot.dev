import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const projectsDirectory = path.join(process.cwd(), 'content/projects')
const learningDirectory = path.join(process.cwd(), 'content/learning')

export interface PostMatter {
  title: string
  date: string
  tags: string[]
  description: string
  journey?: string  // For learning posts
  status?: string   // For learning posts
  [key: string]: any
}

export interface Post {
  slug: string
  matter: PostMatter
  content: string
  journey?: string  // For learning posts
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  return fs.readdirSync(projectsDirectory).filter(name => name.endsWith('.md'))
}

export function getLearningJourneySlugs(): string[] {
  if (!fs.existsSync(learningDirectory)) {
    return []
  }
  return fs.readdirSync(learningDirectory).filter(name => 
    fs.statSync(path.join(learningDirectory, name)).isDirectory()
  )
}

export function getLearningPostSlugs(journey: string): string[] {
  const journeyDirectory = path.join(learningDirectory, journey)
  if (!fs.existsSync(journeyDirectory)) {
    return []
  }
  return fs.readdirSync(journeyDirectory).filter(name => name.endsWith('.md'))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: realSlug,
      matter: data as PostMatter,
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getProjectBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(projectsDirectory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: realSlug,
      matter: data as PostMatter,
      content,
    }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

export function getLearningPostBySlug(journey: string, slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(learningDirectory, journey, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: realSlug,
      matter: data as PostMatter,
      content,
      journey,
    }
  } catch (error) {
    console.error(`Error reading learning post ${journey}/${slug}:`, error)
    return null
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug.replace(/\.md$/, '')))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.matter.date > post2.matter.date ? -1 : 1))
  
  return posts
}

export function getAllProjects(): Post[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug.replace(/\.md$/, '')))
    .filter((project): project is Post => project !== null)
    .sort((project1, project2) => (project1.matter.date > project2.matter.date ? -1 : 1))
  
  return projects
}

export function getAllLearningPosts(journey: string): Post[] {
  const slugs = getLearningPostSlugs(journey)
  const posts = slugs
    .map((slug) => getLearningPostBySlug(journey, slug.replace(/\.md$/, '')))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.matter.date > post2.matter.date ? -1 : 1))
  
  return posts
}

export function getAllLearningPostsAcrossJourneys(): Post[] {
  const journeys = getLearningJourneySlugs()
  const allPosts: Post[] = []
  
  journeys.forEach(journey => {
    const posts = getAllLearningPosts(journey)
    allPosts.push(...posts)
  })
  
  return allPosts.sort((post1, post2) => (post1.matter.date > post2.matter.date ? -1 : 1))
}
