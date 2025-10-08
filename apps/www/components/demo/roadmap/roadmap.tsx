'use client'
import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from 'motion/react'

interface RoadmapStepCardProps {
  title: string
  text_1: string
  text_2: string
  card_contents: React.ReactNode
  position: 'top' | 'bottom'
  className?: string
  layoutId: string
  onClick: () => void
}

const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  title,
  text_1,
  text_2,
  card_contents,
  position,
  className = '',
  layoutId,
  onClick,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateZ = useTransform(x, [-1, 1], [-8, 8])
  const translateX = useTransform(x, [-1, 1], [-12, 12])

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const normalizedX = Math.max(
      -1,
      Math.min(1, (event.clientX - centerX) / (rect.width / 2))
    )
    const normalizedY = Math.max(
      -1,
      Math.min(1, (event.clientY - centerY) / (rect.height / 2))
    )

    animate(x, normalizedX, {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    })
    animate(y, normalizedY, {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    })
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={`absolute -ml-6 flex w-36 cursor-pointer flex-col rounded-xl border border-neutral-400 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)] md:-ml-9 md:w-44 ${className}`}
      onMouseMove={handleMouse}
      onClick={onClick}
      style={{
        [position]: '115px',
        x: translateX,
        rotateZ: rotateZ,
      }}
    >
      <div className="flex h-full flex-col justify-between rounded-xl">
        <div className="bg-background flex flex-col items-start justify-between space-y-0.5 rounded-t-xl p-3 text-center">
          <h3 className="text-sm leading-tight font-bold md:text-base">
            {title}
          </h3>
          <div className="flex w-full items-center justify-between">
            <p className="text-xs leading-tight whitespace-nowrap">{text_1}</p>
            <p className="text-muted-foreground text-xs leading-tight whitespace-nowrap">
              {text_2}
            </p>
          </div>
        </div>

        {card_contents}
      </div>
    </motion.div>
  )
}

interface ExpandedCardProps {
  title: string
  text_1: string
  text_2: string
  card_contents: React.ReactNode
  layoutId: string
  onClose: () => void
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({
  title,
  text_1,
  text_2,
  card_contents,
  layoutId,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-50 flex h-full w-full items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="bg-background border-border relative mx-4 w-full max-w-lg rounded-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col rounded-xl">
          <div className="flex flex-col items-start justify-between space-y-2 rounded-t-xl p-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl leading-tight font-bold">{title}</h3>
              <button
                onClick={onClose}
                className="hover:bg-accent rounded-full p-1 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm leading-tight">{text_1}</p>
              <p className="text-muted-foreground text-sm leading-tight">
                {text_2}
              </p>
            </div>
          </div>

          <div className="p-4 pt-0">{card_contents}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface roadmapProps {
  roadmapSteps: Array<{
    title: string
    text_1: string
    text_2: string
    card_contents: React.ReactNode
  }>
}

const Roadmap = ({ roadmapSteps }: roadmapProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setSelectedCard(index)
  }

  const handleCloseExpanded = () => {
    setSelectedCard(null)
  }

  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden py-32 md:items-center md:justify-center md:pt-32">
      <div className="flex items-center space-x-1">
        {roadmapSteps.map((step, index) => (
          <div key={index} className="relative flex w-full items-center py-16">
            {selectedCard !== index && (
              <RoadmapStepCard
                position={index % 2 === 0 ? 'bottom' : 'top'}
                title={step.title}
                text_1={step.text_1}
                text_2={step.text_2}
                card_contents={step.card_contents}
                layoutId={`card-${index}`}
                onClick={() => handleCardClick(index)}
              />
            )}
            <Check className="bg-muted relative aspect-square size-8 flex-shrink-0 rounded-full p-1.5" />
            {index < roadmapSteps.length - 1 && (
              <div className="-mr-1 h-0.5 w-14 bg-neutral-200 duration-300 sm:hidden md:block md:w-24 lg:w-28 xl:w-44"></div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <ExpandedCard
            title={roadmapSteps[selectedCard].title}
            text_1={roadmapSteps[selectedCard].text_1}
            text_2={roadmapSteps[selectedCard].text_2}
            card_contents={roadmapSteps[selectedCard].card_contents}
            layoutId={`card-${selectedCard}`}
            onClose={handleCloseExpanded}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Roadmap
