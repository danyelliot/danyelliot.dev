import { usePathname } from 'next/navigation'

// For GitHub Pages deployment with repository name 'website'
const basePath = '/website'

export function useBasePath() {
  return basePath
}

export function withBasePath(path: string) {
  return basePath + path
}
