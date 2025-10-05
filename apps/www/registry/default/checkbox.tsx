'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

function CheckboxComponent({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-primary/40 dark:bg-input/30 data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary hover:outline-ring focus-visible:outline-ring aria-invalid:outline-destructive/20 dark:aria-invalid:outline-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none hover:outline-[0.5px] hover:outline-offset-2 hover:outline-dashed focus-visible:ring-0 focus-visible:outline-offset-2 focus-visible:outline-dashed disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:outline-0',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
        >
          <CheckIcon className="text-primary size-4" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { CheckboxComponent }
