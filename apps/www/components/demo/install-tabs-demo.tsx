'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({
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
    <div className="rounded-xl border border-white/10 bg-black/60 p-3">
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
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-zinc-950 p-1.5 text-neutral-400 opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-zinc-700 hover:text-white"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="size-4 text-green-400" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}

export interface InstallOption {
  id: string
  label: string
  command: string
}

interface InstallTabsProps {
  options: InstallOption[]
}

const STORAGE_KEY = 'inset-ui-preferred-package-manager'

const InstallTabs = ({ options }: InstallTabsProps) => {
  const [activeManager, setActiveManager] = useState(options[0]?.id || '')

  useEffect(() => {
    const savedManager = localStorage.getItem(STORAGE_KEY)
    const isValidOption =
      savedManager && options.some((option) => option.id === savedManager)

    if (isValidOption) {
      setActiveManager(savedManager)
    }
  }, [options])

  const handleManagerChange = (managerId: string) => {
    setActiveManager(managerId)
    localStorage.setItem(STORAGE_KEY, managerId)
  }

  const activeCommand =
    options.find((option) => option.id === activeManager)?.command || ''

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleManagerChange(option.id)}
            className={`rounded-sm border p-1 px-1.5 text-xs transition-colors ${
              option.id === activeManager
                ? 'bg-white/10 text-white shadow-[0_12px_30px_-20px_rgba(167,139,250,0.6)]'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/40 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <CodeBlock language="bash">{activeCommand}</CodeBlock>
    </div>
  )
}

export default InstallTabs
