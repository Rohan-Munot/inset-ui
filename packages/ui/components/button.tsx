import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@inset/ui/lib/utils";

const buttonVariants = cva(
  "relative inline-flex gap-2 shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-border font-medium text-base outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:rounded-[calc(var(--radius-xl)-1px)] [&_svg]:-mx-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-200 ease-in-out focus-visible:ring-offset-background sm:text-sm [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [:active,[data-pressed]]:scale-95 before:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_-1px_2px_rgba(255,255,255,0.08)] dark:before:shadow-[0_-1px_0px_0_rgba(255,255,255,0.2)]",

  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "px-4.5 py-1.5 h-9",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-5 py-3 text-lg",
        icon: "h-10 w-10",
      },
      variant: {
        default: "bg-card text-card-foreground hover:bg-card/90",
        outline:
          "bg-transparent text-primary border border-border hover:bg-primary/10 hover:text-primary",
        destructive:
          "bg-linear-to-b dark:from-red-700 dark:to-red-600 from-red-600 to-red-500 text-white hover:from-red-600 hover:to-red-500 outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 shadow-[inset_0_-1px_3px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-1px_3px_0_rgba(255,255,255,0.35)]",
        "destructive-outline":
          "bg-transparent text-destructive border border-border  outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 hover:shadow-[inset_0_-1px_5px_0_rgba(220,38,38,0.3)] dark:hover:shadow-[inset_0_-1px_5px_0_rgba(248,113,113,0.4)] border-destructive/80",
        ghost:
          "bg-transparent text-primary hover:bg-primary/10 hover:text-primary border-none",
      },
    },
  }
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    className: cn(buttonVariants({ variant, size, className })),
    "data-slot": "button",
    type: typeValue,
  } as useRender.ElementProps<"button"> & { "data-slot": string };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export { Button, buttonVariants };
