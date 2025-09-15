import { usePathname } from 'next/navigation'

// For GitHub Pages deployment with repository name 'website'
// Only use basePath in production
const basePath = process.env.NODE_ENV === 'production' ? '/website' : ''

export function useBasePath() {
  return basePath
}

export function withBasePath(path: string) {
  return basePath + path
}
