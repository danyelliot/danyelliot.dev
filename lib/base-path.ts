import { usePathname } from 'next/navigation'

// For GitHub Pages deployment without custom domain
const basePath = '/danyelliot.dev'

export function useBasePath() {
  return basePath
}

export function withBasePath(path: string) {
  return basePath + path
}
