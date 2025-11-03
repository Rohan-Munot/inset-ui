'use client'
import { motion } from 'motion/react'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { useParams } from 'next/navigation'

export default function Error() {
  const { slug } = useParams()
  const slugString = Array.isArray(slug) ? slug.join('/') : slug || 'unknown'

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-8xl font-bold text-white/20">404</h1>
      </motion.div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-3xl font-semibold text-white">
          Component Not Found
        </h2>
        <p className="max-w-md text-sm text-white/60">
          The component{' '}
          <span className="font-mono text-white/80">"{slugString}"</span>{' '}
          doesn't exist. Check the component name or browse available
          components.
        </p>
      </motion.div>

      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link href="/">
          <button className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none">
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
