import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@inset/ui/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "relative inline-flex shrink-0 rounded-sm border border-border bg-background bg-clip-border text-foreground size-5 items-center justify-center shadow-xs outline-none ring-ring",
        "focus-visible:ring-1 focus-visible:ring-ring/80 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "before:pointer-events-none before:absolute before:inset-0 dark:before:shadow-[0_-1px_0_0_rgba(255,255,255,0.2)] before:rounded-[calc(var(--radius-sm)-1px)] before:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)]",
        "dark:shadow-[0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_-1px_2px_rgba(255,255,255,0.08)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center inset-0 data-checked:bg-primary data-checked:text-primary-foreground"
        render={CheckIcon}
      />
    </CheckboxPrimitive.Root>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  );
}

export { Checkbox };
