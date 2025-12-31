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
          "h-full overscroll-contain rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring mr-2.5"
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
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "m-1 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:h-1.5",
        "opacity-0 transition-opacity delay-300 data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100",
        className
      )}
      data-slot="scroll-area-scroll-bar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn("relative flex-1 rounded-full bg-foreground/10")}
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
