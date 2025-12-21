import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@inset/ui/lib/utils";

function Input({ className, ...props }: InputPrimitive.Props) {
  return (
    <span
      className={cn(
        "relative inline-flex w-full rounded-xl border border-input bg-card bg-clip-padding text-base shadow-xs ring-ring/24 transition-all duration-200 ease-in-out",
        "has-focus-visible:border-ring/50 has-focus-visible:ring-ring/10 has-focus-visible:ring-[3px]",
        "before:pointer-events-none before:absolute before:inset-0 dark:before:shadow-[0_-1px_0_0_rgba(255,255,255,0.15)] before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_-1px_0_0_rgba(125,125,125,0.15)]",
        className
      )}
    >
      <InputPrimitive
        className={cn(
          "relative w-full rounded-[inherit] bg-transparent px-2.5 text-sm font-medium text-foreground h-7.5 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        data-slot="input"
        {...props}
      />
    </span>
  );
}

export { Input };
