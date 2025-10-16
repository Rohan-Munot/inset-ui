'use client'
import { motion } from 'motion/react'
import { GithubLogoIcon } from '@phosphor-icons/react'
import { Icon } from '@/components/icon'
import SimpleButton from '@/components/demo/button-demo'
import Link from 'next/link'
const Page = () => {
  return (
    <div className="flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm [scrollbar-width:none]">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="size-8 text-white">
              <Icon />
            </div>
            <h1 className="text-3xl font-semibold text-white">Inset UI</h1>
          </motion.div>

          <motion.div
            className="max-w-2xl space-y-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg font-medium text-white/90">
              Beautiful, modern UI components for your next project
            </p>
            <p className="text-sm text-white/60">
              A collection of carefully crafted, animated components built with
              React and Tailwind CSS. Ready to integrate, easy to customize.
            </p>
          </motion.div>

          <motion.div
            className="flex max-w-md items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/components/shimmer-button">
              <SimpleButton className="w-full justify-center px-6 py-5 text-base font-semibold">
                Explore Components
              </SimpleButton>
            </Link>
            <Link
              href="https://github.com/Rohan-Munot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-sm"
            >
              <GithubLogoIcon className="size-4 text-white" />
              GitHub
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Page
