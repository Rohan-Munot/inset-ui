'use client'

import React, { useState } from 'react'
import { COMPONENT_SECTIONS } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

const SideMenu = () => {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Buttons',
  ])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    )
  }

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <div className="flex w-[16rem] flex-col rounded-s-xl rounded-e-xs border bg-neutral-900 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
      {/* Header */}
      <div className="border-b p-3">
        <h2 className="text-foreground font-[inter] text-2xl font-normal tracking-normal">
          Inset
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-2">
          <div className="pt-2">
            <h3 className="text-muted-foreground px-2 py-2 text-xs font-semibold tracking-wide uppercase">
              Components
            </h3>
            <div className="space-y-1">
              {COMPONENT_SECTIONS.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="text-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium transition-colors"
                  >
                    <span>{section.title}</span>
                    <motion.div
                      animate={{
                        rotate: expandedSections.includes(section.title)
                          ? 90
                          : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(section.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 space-y-1 py-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                'group flex flex-col px-3 py-2 text-sm transition-colors',
                                isActiveLink(item.href)
                                  ? 'bg-primary/10 text-primary border-primary border-l-2'
                                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                              )}
                            >
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-3 text-start">
        <div className="text-muted-foreground text-xs">
          <p>Built with Shadcn UI</p>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
