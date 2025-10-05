'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

export const FlipText = ({
  textArray,
  className = '',
}: {
  textArray: string[]
  className?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % textArray.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [textArray.length])

  const currentText = textArray[currentIndex]
  const splittedText = currentText.split('')

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <AnimatePresence mode="wait">
      <div key={currentIndex} className="flex justify-center">
        {splittedText.map((current, i) => (
          <motion.div
            key={`${currentIndex}-${i}`}
            ref={ref}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? 'animate' : ''}
            custom={i}
            className={cn(
              'text-center text-xl font-bold tracking-tighter sm:text-4xl md:text-6xl md:leading-[4rem]',
              className
            )}
          >
            {current === ' ' ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
