import { usePathname } from 'next/navigation'

// For GitHub Pages deployment with custom domain - no basePath needed
const basePath = ''

export function useBasePath() {
  return basePath
}

export function withBasePath(path: string) {
  return path
}
