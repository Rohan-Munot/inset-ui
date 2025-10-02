import { cn } from "@/lib/utils";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = cva(
  "flex flex-row items-center justify-center gap-2 text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:ring-zinc-300/50 focus-visible:ring-[4px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-linear-to-b from-zinc-800 to-zinc-700 text-white text-shadow-xs hover:to-zinc-700 dark:from-zinc-800 dark:to-zinc-700 inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/20 inset-shadow-neutral-100/50 dark:hover:to-zinc-600 h-8 px-4 relative rounded-full",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8  gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10  px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      defaultVariants: {
        size: "default",
      },
    },
  }
);
function SimpleButton({
  className,
  size,
  asChild = false,
  ...props
}: ButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ size }), className)}
      {...props}
    />
  );
}

export default SimpleButton;
