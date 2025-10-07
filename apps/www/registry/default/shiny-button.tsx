'use client'
import React from 'react'
import { motion, type MotionProps } from 'motion/react'

const animationProps = {
  initial: { '--x': '100%' },
  animate: { '--x': '-100%' },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 0.5,
    duration: 4,
    ease: 'linear',
  },
} as MotionProps

export function ShimmerButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.button
      {...props}
      {...animationProps}
      className={`focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 relative flex h-8 flex-row items-center justify-center gap-2 rounded-full bg-linear-to-b from-zinc-800 to-zinc-700 px-4 text-sm font-medium whitespace-nowrap text-white transition-all outline-none select-none text-shadow-xs hover:to-zinc-700 focus-visible:ring-[3px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:from-zinc-800 dark:to-zinc-700 dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/20 dark:hover:to-zinc-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ${className}`}
    >
      <span
        className="relative flex flex-row items-center justify-center gap-2"
        style={{
          maskImage:
            'linear-gradient(-75deg, black calc(var(--x) + 20%), transparent calc(var(--x) + 30%), purple calc(var(--x) + 100%))',
        }}
      >
        {children}
      </span>

      <span
        style={{
          backgroundImage:
            'linear-gradient(-75deg, transparent calc(var(--x) + 20%), rgba(255,255,255,0.3) calc(var(--x) + 25%), transparent calc(var(--x) + 30%))',
        }}
        className="absolute inset-0 z-10 block items-center justify-center rounded-full"
      />
    </motion.button>
  )
}
