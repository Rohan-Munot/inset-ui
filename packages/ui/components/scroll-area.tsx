"use client";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "@inset/ui/lib/utils";

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("size-full min-h-0", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "h-full overscroll-contain rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn("m-1", className)}
      data-slot="scroll-area-scroll-bar"
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "relative flex-1 rounded-full bg-border transition-colors duration-200 ease-in-out",
          "has-hover:bg-border/80 has-active:bg-border"
        )}
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
