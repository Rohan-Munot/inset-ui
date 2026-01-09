import { cn } from "@inset/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 bg-clip-border text-sm font-medium [&_svg]:size-3.5 gap-1.5",
  {
    variants: {
      variant: {
        default: " bg-primary text-primary-foreground",
        secondary: " bg-secondary text-secondary-foreground",
        success:
          " bg-gradient-to-b from-[#38b000] to-[#008000] text-success-foreground",
        warning:
          " bg-gradient-to-b from-[#ff7b00] to-[#ffa200] text-warning-foreground",
        error:
          "bg-linear-to-b dark:from-red-700 dark:to-red-600 from-red-600 to-red-500 text-white hover:from-red-600 hover:to-red-500 outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 shadow-[inset_0_-1px_3px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-1px_3px_0_rgba(255,255,255,0.35)] ",
        "destructive-outline":
          "bg-transparent text-destructive border border-border  outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 hover:shadow-[inset_0_-1px_5px_0_rgba(220,38,38,0.3)] dark:hover:shadow-[inset_0_-1px_5px_0_rgba(248,113,113,0.4)] border-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
