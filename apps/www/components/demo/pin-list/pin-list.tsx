'use client'

import { useMemo, useState } from 'react'
import { Pin, PinOff } from 'lucide-react'
import { AnimatePresence, motion, LayoutGroup } from 'motion/react'
import CheckboxLabel from '@/components/demo/checkbox-label/checkbox-label'
import { cn } from '@/lib/utils'
import { Badge } from '../../ui/badge'

type TaskOwner = {
  name: string
  role?: string
}

type Task = {
  id: string
  title: string
  description: string
  stage: string
  due: string
  pinned: boolean
  owner?: TaskOwner
}

type TaskList = {
  id: string
  title: string
  summary: string
  tasks: Task[]
}

const PinList = ({ taskList }: { taskList: TaskList }) => {
  const [taskListState, setTaskListState] = useState<TaskList>(taskList)

  const { orderedList } = useMemo(() => {
    const pinned: Task[] = []
    const others: Task[] = []
    for (const task of taskListState.tasks) {
      ;(task.pinned ? pinned : others).push(task)
    }
    return { orderedList: [...pinned, ...others] }
  }, [taskListState.tasks])

  const handlePinToggle = (taskId: string) => {
    setTaskListState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, pinned: !task.pinned } : task
      ),
    }))
  }
  const getInitials = (name: string) => {
    const words = name.split(' ')
    const firstInitial = words[0]?.charAt(0) || ''
    const lastInitial = words[1]?.charAt(0) || ''
    return firstInitial + lastInitial
  }

  return (
    <LayoutGroup id={`${taskList.id}-group`}>
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-2 [scrollbar-width:none]">
        {orderedList.map((task) => {
          const isPinned = task.pinned
          return (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { duration: 0.3 },
              }}
              className={cn(
                'group border-border/50 relative flex flex-col gap-3 overflow-visible rounded-2xl border bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-[#1b1b1b] p-4 transition-colors duration-300',
                'hover:from-[#0d0d0d]/90 hover:via-[#1b1b1b]/90 hover:to-[#1b1b1b]/90',
                'shadow-[inset_0_1px_1px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(255,255,255,0.1)]',
                isPinned && 'border-border shadow-xs'
              )}
            >
              {/* Header of the card */}
              <div className="mt-1 flex items-center justify-between gap-3">
                <CheckboxLabel
                  id={`${taskList.id}-${task.id}`}
                  text={task.title}
                  variants="strike"
                  className="text-foreground text-sm font-medium"
                />

                <motion.button
                  type="button"
                  className={cn(
                    'bg-card flex size-8 items-center justify-center rounded-full border border-transparent',
                    'hover:bg-card/90 focus-visible:outline-primary hover:scale-105 focus-visible:outline-offset-2 focus-visible:outline-dashed active:scale-95',
                    'opacity-0 group-hover:opacity-100',
                    isPinned && 'opacity-100'
                  )}
                  aria-pressed={isPinned}
                  aria-label={isPinned ? 'Unpin task' : 'Pin task'}
                  title={isPinned ? 'Unpin task' : 'Pin task'}
                  onClick={() => handlePinToggle(task.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPinned ? (
                    <PinOff className="text-primary size-4" />
                  ) : (
                    <Pin className="text-muted-foreground group-hover:text-primary size-4 transition" />
                  )}
                </motion.button>
              </div>

              <p className="text-muted-foreground pl-8 text-start text-sm">
                {task.description}
              </p>
              {/* footer of pinlist card */}
              <div className="text-muted-foreground ml-8 flex flex-wrap items-center gap-3 text-xs">
                <Badge variant="outline" className="rounded-full">
                  {task.stage}
                </Badge>
                <span>{task.due}</span>
                {task.owner && (
                  <span className="inline-flex items-center gap-2">
                    <span className="bg-muted text-foreground/80 inline-flex size-6 items-center justify-center rounded-full text-[0.65rem] font-semibold">
                      {getInitials(task.owner.name)}
                    </span>
                    <span className="text-foreground/80 text-xs font-medium">
                      {task.owner.name}
                    </span>
                  </span>
                )}
              </div>
              {/* Pinned badge top left */}
              <AnimatePresence>
                {isPinned && (
                  <motion.span
                    key="pinned-badge"
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.8,
                      backdropFilter: 'blur(0px)',
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      backdropFilter: 'blur(20px)',
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.8,
                      backdropFilter: 'blur(0px)',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="border-border text-primary absolute -top-2 left-4 z-20 inline-flex items-center gap-1 rounded-full border bg-[#0d0d0d] px-3 py-1.5 text-[0.6rem] font-medium tracking-wider uppercase shadow-[0_6px_20px_rgba(53,64,82,0.18)]"
                  >
                    Pinned
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
export default PinList
