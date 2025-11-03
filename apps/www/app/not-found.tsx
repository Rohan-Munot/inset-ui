'use client'
import { motion } from 'motion/react'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@phosphor-icons/react'

const NotFound = () => {
  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-s-xs rounded-e-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-6 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-gradient-to-tl from-white/5 to-transparent blur-3xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 1,
          }}
        />
        <div className="absolute top-0 left-1/2 h-1/3 w-full -translate-x-1/2 bg-gradient-to-b from-white/5 via-transparent to-transparent blur-2xl" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center">
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
          <h2 className="text-3xl font-semibold text-white">Page Not Found</h2>
          <p className="max-w-md text-sm text-white/60">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or removed.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/">
            <button className="bg-accent inline-flex items-center gap-2 rounded-[20px] border px-4 py-2.5 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none">
              <ArrowLeftIcon className="size-4" />
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
