"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function CheckboxComponent({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-neutral-500 dark:bg-input/30 data-[state=checked]:bg-neutral-100 data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-neutral-700 data-[state=checked]:border-primary hover:outline-dashed hover:outline-ring hover:outline-offset-2 hover:outline-[0.5px] focus-visible:ring-0 focus-visible:outline-dashed focus-visible:outline-ring focus-visible:outline-offset-2 aria-invalid:outline-destructive/20 dark:aria-invalid:outline-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:outline-0",
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
          <CheckIcon className="size-4 text-neutral-700 dark:text-neutral-300" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxComponent };
