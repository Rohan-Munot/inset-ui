import { cn } from '@/lib/utils'
import React from 'react'
import { motion, type MotionProps } from 'motion/react'
import { cva, VariantProps } from 'class-variance-authority'

interface StatefulButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  size?: 'default' | 'sm' | 'lg' | 'icon'
  state?: 'default' | 'loading' | 'success' | 'error' | 'disabled' | 'warning'
  loadingText?: string
  successText?: string
  errorText?: string
  warningText?: string
}

const buttonVariants = cva(
  "flex flex-row items-center justify-center gap-2 text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:ring-zinc-300/50 focus-visible:ring-[4px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-white text-shadow-xs inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/20 inset-shadow-neutral-100/50 h-8 px-4 relative rounded-full",
  {
    variants: {
      size: {
        default: 'h-8 px-4 has-[>svg]:px-3',
        sm: 'h-8  gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10  px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

const getBackgroundGradient = (state: string) => {
  switch (state) {
    case 'loading':
      return 'linear-gradient(to bottom, #023e8a, #0077b6)'
    case 'success':
      return 'linear-gradient(to bottom, #38b000, #008000)'
    case 'error':
      return 'linear-gradient(to bottom, #a4161a, #d00000)'
    case 'warning':
      return 'linear-gradient(to bottom, #ff7b00, #ffa200)'
    case 'disabled':
      return 'linear-gradient(to bottom, #27272a, #3f3f46)'
    default:
      return 'linear-gradient(to bottom, #27272a, #3f3f46)'
  }
}

const LoadingSpinner = () => (
  <motion.svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M168,40a97,97,0,0,1,56,88,96,96,0,0,1-192,0A97,97,0,0,1,88,40"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </motion.svg>
)

const CheckIcon = () => (
  <motion.svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </motion.svg>
)

const ErrorIcon = () => (
  <motion.svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </motion.svg>
)

const WarningIcon = () => (
  <motion.svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </motion.svg>
)

function StatefulButton({
  className,
  size,
  state = 'default',
  children,
  loadingText = 'Loading',
  successText = 'Success',
  errorText = 'Error',
  warningText = 'Warning',
  disabled,
  ...props
}: StatefulButtonProps & VariantProps<typeof buttonVariants>) {
  const isDisabled = disabled || state === 'disabled'
  const currentState = isDisabled ? 'disabled' : state

  const getContent = () => {
    switch (state) {
      case 'loading':
        return (
          <>
            <LoadingSpinner />
            {loadingText}
          </>
        )
      case 'success':
        return (
          <>
            <CheckIcon />
            {successText}
          </>
        )
      case 'error':
        return (
          <>
            <ErrorIcon />
            {errorText}
          </>
        )
      case 'warning':
        return (
          <>
            <WarningIcon />
            {warningText}
          </>
        )
      default:
        return children
    }
  }

  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ size }), className)}
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      animate={{
        background: getBackgroundGradient(currentState),
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      {...(props as MotionProps)}
    >
      {getContent()}
    </motion.button>
  )
}

export default StatefulButton
