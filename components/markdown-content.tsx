'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownProps) {
  return (
    <div className="max-w-none text-foreground">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6 mt-8 text-emerald-400">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-emerald-400">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-3 mt-6 text-emerald-300">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold mb-2 mt-4 text-emerald-300">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-400 pl-4 italic mb-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="text-emerald-300 font-semibold">
              {children}
            </strong>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-emerald-400 hover:text-emerald-300 underline" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const match = /language-(\w+)/.exec(className || '')
            if (match) {
              return (
                <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-emerald-300">
                    {children}
                  </code>
                </pre>
              )
            }
            return (
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300 text-sm">
                {children}
              </code>
            )
          },
          hr: () => (
            <hr className="border-slate-700 my-8" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
