'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({
  children,
  language = 'jsx',
}: {
  children: string
  language?: string
}) {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <div className="group relative [scrollbar-width:none]">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={true}
        wrapLongLines={true}
        customStyle={{
          margin: 0,
          padding: '16px',
          borderRadius: '8px',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          scrollbarWidth: 'none',
        }}
      >
        {children}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-md bg-zinc-950 p-1.5 text-neutral-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-zinc-700 hover:text-white"
        aria-label="Copy code"
      >
        {hasCopied ? (
          <Check className="size-4 text-green-400" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  )
}
