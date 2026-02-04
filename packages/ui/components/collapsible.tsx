import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "@inset/ui/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";

function Collapsible(props: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "flex items-center justify-between cursor-pointer gap-2 [&[data-panel-open]>svg]:rotate-90 [&[data-panel-open]>svg]:-mt-0.5",
        className
      )}
      data-slot="collapsible-trigger"
      {...props}
    >
      {children}
      <IconChevronRight className="pointer-events-none size-4 shrink-0 transition-transform duration-200 ease-in-out" />
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
