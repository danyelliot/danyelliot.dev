import { usePathname } from 'next/navigation'

const basePath = process.env.NODE_ENV === 'production' ? '/danyelliot.dev' : ''

export function useBasePath() {
  return basePath
}

export function withBasePath(path: string) {
  return basePath + path
}
