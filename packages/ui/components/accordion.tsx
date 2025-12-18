"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "@inset/ui/lib/utils";

function Accordion(props: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0 border-border/80", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          cn(
            "flex flex-1 py-2.5 px-0.5 items-center justify-between [&[data-panel-open]>svg]:rotate-180",
            "transition-all duration-200 ease-in-out",
            "focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-ring outline-offset-1.5",
            className
          )
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <CaretDownIcon className="pointer-events-none size-4 shrink-0 transition-transform duration-200 ease-in-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-in-out data-ending-style:h-0 data-starting-style:h-0"
      data-slot="accordion-panel"
      {...props}
    >
      <div className={cn("pt-0 pb-4 px-0.5", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPanel as AccordionContent,
};
