'use client'

import React from 'react'
import { COMPONENT_SECTIONS } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { motion, Variants } from 'motion/react'
import { Icon } from './icon'
import { GithubLogoIcon } from '@phosphor-icons/react'

const SideMenu = () => {
  const pathname = usePathname()
  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <div className="flex w-[16rem] flex-col rounded-s-xl rounded-e-xs border bg-neutral-900 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
      {/* Header */}
      <Link
        href="/"
        className="flex items-center justify-start gap-2 border-b p-3"
      >
        <div className="size-5">
          <Icon />
        </div>
        <h2 className="text-foreground text-xl font-normal tracking-normal">
          Inset Ui
        </h2>
      </Link>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        <div className="space-y-2 p-2">
          <div className="pt-2">
            <div className="space-y-1">
              {COMPONENT_SECTIONS.map((section) => (
                <div key={section.title}>
                  <Button
                    variant="ghost"
                    className="flex w-full justify-start px-3 text-white"
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    {/* <ChevronRightIcon className="h-4 w-4 rotate-90" /> */}
                  </Button>

                  <div className={cn('ml-4 border-l border-zinc-700')}>
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'group flex max-w-[13rem] flex-col rounded-xs px-3 py-1 text-sm transition-colors',
                          isActiveLink(item.href)
                            ? 'border-l border-white text-white transition-colors duration-300 ease-in-out'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <span className="text-sm font-normal">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-3 py-1.5 text-start">
        <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
          <Link
            href="https://github.com/Rohan-Munot"
            target="_blank"
            className="group flex items-center justify-center gap-2"
          >
            <p className="group-hover:text-white">Built by Rohan </p>
            <GithubLogoIcon className="size-4 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
