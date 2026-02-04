"use client";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "@inset/ui/lib/utils";
import { Input } from "@inset/ui/input";
import { ScrollArea } from "@inset/ui/scroll-area";
import { IconCheck, IconChevronUp, IconX } from "@tabler/icons-react";
import { createContext, useContext, useRef } from "react";

const ComboboxContext = createContext<{
  chipsRef: React.RefObject<HTMLDivElement | null> | null;
}>({
  chipsRef: null,
});

function Combobox<T, M extends boolean = false>(
  props: ComboboxPrimitive.Root.Props<T, M>,
) {
  const chipsRef = useRef<HTMLDivElement | null>(null);

  return (
    <ComboboxContext.Provider value={{ chipsRef }}>
      <ComboboxPrimitive.Root data-slot="combobox" {...props} />
    </ComboboxContext.Provider>
  );
}

function ComboboxInput({
  className,
  trigger,
  hasClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  trigger?: boolean;
  hasClear?: boolean;
}) {
  return (
    <div className="relative w-full">
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        className={cn(
          "w-full bg-card text-sm font-medium text-foreground",
          "leading-9",
          "transition-all duration-200 ease-in-out",
          "focus-visible:border-ring/50 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          (trigger || hasClear) &&
            "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=input]:pe-8",
          className,
        )}
        render={<Input />}
        {...props}
      />
      {trigger && (
        <ComboboxTrigger
          className={cn(
            "absolute top-1/2 -translate-y-1/2 end-2.5 inline-flex shrink-0 cursor-pointer",
            "opacity-80 hover:opacity-100",
            "has-[+[data-slot=combobox-clear]]:hidden",
            "transition-all duration-200 ease-in-out",
          )}
        >
          <IconChevronUp className="size-4 shrink-0" />
        </ComboboxTrigger>
      )}
      {hasClear && (
        <ComboboxClear
          className={cn(
            "absolute top-1/2 -translate-y-1/2 end-2.5",
            "transition-all duration-200 ease-in-out",
            "opacity-80 hover:opacity-100",
            "has-[+[data-slot=combobox-trigger]]:hidden",
          )}
        >
          <IconX className="size-4 shrink-0" />
        </ComboboxClear>
      )}
    </div>
  );
}

function ComboboxTrigger({
  className,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={className}
      data-slot="combobox-trigger"
      {...props}
    />
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      className={className}
      data-slot="combobox-clear"
      {...props}
    />
  );
}

function ComboboxPopup({
  children,
  className,
  ...props
}: ComboboxPrimitive.Popup.Props) {
  const { chipsRef } = useContext(ComboboxContext);

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={2} anchor={chipsRef}>
        <span className="relative flex max-h-full">
          <ComboboxPrimitive.Popup
            className={cn(
              "relative origin-(--transform-origin) rounded-xl border bg-popover bg-clip-padding transition-[scale,opacity] before:pointer-events-none before:shadow-lg has-data-starting-style:scale-20 has-data-starting-style:opacity-0 flex max-h-[min(var(--available-height),23rem)] w-(--anchor-width) flex-col",
              "border-border shadow-inner",
              "dark:shadow-[inset_0_-1px_2px_0_rgba(255,255,255,0.15)]",
              className,
            )}
            data-slot="combobox-popup"
            {...props}
          >
            {children}
          </ComboboxPrimitive.Popup>
        </span>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "flex min-h-8 px-2 py-1 rounded-lg items-center",
        "cursor-default select-none",
        "data-disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:pointer-events-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "transition-all duration-200 ease-in-out",
        "opacity-80 hover:opacity-100",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      <span className="flex-1 ">{children} </span>
      <ComboboxPrimitive.ItemIndicator>
        <IconCheck />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      className={cn("h-px w-full bg-border my-1", className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}
function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      className={className}
      data-slot="combobox-group"
      {...props}
    />
  );
}

function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(
        "text-xs font-medium text-muted-foreground px-2 py-1",
        className,
      )}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "text-muted-foreground text-base font-medium text-center not-empty:p-2 sm:text-sm",
        className,
      )}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ScrollArea>
      <ComboboxPrimitive.List
        className={cn(
          "not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3 ",
          className,
        )}
        data-slot="combobox-list"
        {...props}
      />
    </ScrollArea>
  );
}

function ComboboxStatus({
  className,
  ...props
}: ComboboxPrimitive.Status.Props) {
  return (
    <ComboboxPrimitive.Status
      className={cn(
        "px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0",
        className,
      )}
      data-slot="combobox-status"
      {...props}
    />
  );
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxRow({ className, ...props }: ComboboxPrimitive.Row.Props) {
  return (
    <ComboboxPrimitive.Row
      className={className}
      data-slot="combobox-row"
      {...props}
    />
  );
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  const { chipsRef } = useContext(ComboboxContext);

  return (
    <ComboboxPrimitive.Chips
      ref={chipsRef}
      className={cn(
        "relative inline-flex flex-wrap gap-1 border border-border bg-background bg-clip-padding",
        className,
      )}
      data-slot="combobox-chips"
      {...props}
    />
  );
}

function ComboboxChip({ children, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      className="flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 py-0.5 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      <ComboboxChipRemove />
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipRemove(props: ComboboxPrimitive.ChipRemove.Props) {
  return (
    <ComboboxPrimitive.ChipRemove
      aria-label="Remove"
      className="h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
      data-slot="combobox-chip-remove"
      {...props}
    >
      <IconX />
    </ComboboxPrimitive.ChipRemove>
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPopup,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxEmpty,
  ComboboxList,
  ComboboxValue,
  ComboboxClear,
  ComboboxStatus,
  ComboboxRow,
  ComboboxCollection,
  ComboboxChips,
  ComboboxChip,
};
