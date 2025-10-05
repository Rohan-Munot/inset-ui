'use client'
import { CheckboxComponent } from '@/components/checkbox/01_checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'

const labelVariants = cva('transition-all duration-200', {
  variants: {
    variant: {
      default: '',
      strike: '',
    },
    checked: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'strike',
      checked: true,
      class: 'opacity-60',
    },
  ],
  defaultVariants: {
    variant: 'default',
    checked: false,
  },
})

interface CheckboxLabelProps extends React.ComponentProps<typeof Label> {
  id: string
  text: string
  disabled?: boolean
  variants?: 'strike' | 'default'
}

const CheckboxLabel = ({
  id,
  text,
  className,
  disabled,
  variants,
  ...labelProps
}: CheckboxLabelProps) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <CheckboxComponent
        id={id}
        disabled={disabled}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
      />
      <Label
        htmlFor={id}
        className={cn(
          labelVariants({ variant: variants, checked: isChecked }),
          className
        )}
        {...labelProps}
      >
        <span className="relative">
          {text}
          <AnimatePresence>
            {isChecked && variants === 'strike' && (
              <motion.div
                className="absolute top-1/2 left-0 h-[1px] bg-current"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: '100%',
                  opacity: 1,
                }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </span>
      </Label>
    </div>
  )
}

export default CheckboxLabel
