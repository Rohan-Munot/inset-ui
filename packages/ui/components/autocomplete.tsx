import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { cn } from "@inset/ui/lib/utils";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import { Input } from "@inset/ui/input";
import { ScrollArea } from "@inset/ui/scroll-area";

const Autocomplete = AutocompletePrimitive.Root;
function AutocompleteInput({
  className,
  trigger,
  size = "default",
  hasClear = false,
  ...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> & {
  trigger?: boolean;
  size?: "sm" | "default" | "lg";
  hasClear?: boolean;
}) {
  return (
    <div className="relative w-full">
      <AutocompletePrimitive.Input
        className={cn(
          "w-full bg-card text-sm font-medium text-foreground",
          "leading-9",
          "transition-all duration-200 ease-in-out",
          "focus-visible:border-ring/50 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          (trigger || hasClear) &&
            "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=input]:pe-8",
          className
        )}
        data-slot="autocomplete-input"
        render={<Input />}
        {...props}
      />
      {trigger && (
        <AutocompleteTrigger
          className={cn(
            "absolute top-1/2 -translate-y-1/2 end-2.5 [&[data-popup-open]>svg]:rotate-180 inline-flex shrink-0 cursor-pointer",
            "opacity-80 hover:opacity-100",
            "has-[+[data-slot=autocomplete-clear]]:hidden",
            "transition-all duration-200 ease-in-out"
          )}
        >
          <CaretDownIcon className="size-4 shrink-0 transition-transform duration-200 ease-in-out" />
        </AutocompleteTrigger>
      )}
      {hasClear && (
        <AutocompleteClear
          className={cn(
            "absolute top-1/2 -translate-y-1/2 end-2.5",
            "transition-all duration-200 ease-in-out",
            "opacity-80 hover:opacity-100",
            "has-[+[data-slot=autocomplete-trigger]]:hidden"
          )}
        >
          <XIcon className="size-4 shrink-0" />
        </AutocompleteClear>
      )}
    </div>
  );
}

function AutocompleteTrigger({
  className,
  ...props
}: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      className={className}
      data-slot="autocomplete-trigger"
      {...props}
    />
  );
}

function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      className={className}
      data-slot="autocomplete-clear"
      {...props}
    />
  );
}

function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props) {
  return (
    <ScrollArea>
      <AutocompletePrimitive.List
        className={cn(
          "not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3 ",
          className
        )}
        data-slot="autocomplete-list"
        {...props}
      />
    </ScrollArea>
  );
}

function AutocompletePopup({
  children,
  className,
  ...props
}: AutocompletePrimitive.Popup.Props) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner sideOffset={2}>
        <span className="relative flex max-h-full">
          <AutocompletePrimitive.Popup
            className={cn(
              "relative origin-(--transform-origin) rounded-xl border bg-popover bg-clip-padding transition-[scale,opacity] before:pointer-events-none before:shadow-lg has-data-starting-style:scale-20 has-data-starting-style:opacity-0 flex max-h-[min(var(--available-height),23rem)] w-(--anchor-width) flex-col",
              "border-border shadow-inner",
              "dark:shadow-[inset_0_-1px_2px_0_rgba(255,255,255,0.15)]",
              className
            )}
            data-slot="autocomplete-popup"
            {...props}
          >
            {children}
          </AutocompletePrimitive.Popup>
        </span>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

function AutocompleteStatus({
  className,
  ...props
}: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      className={className}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      className={cn(
        "text-muted-foreground text-base font-medium text-center not-empty:p-2 sm:text-sm",
        className
      )}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
}

function AutocompleteCollection({
  ...props
}: AutocompletePrimitive.Collection.Props) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  );
}

function AutocompleteRow({
  className,
  ...props
}: AutocompletePrimitive.Row.Props) {
  return (
    <AutocompletePrimitive.Row
      className={className}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

function AutocompleteItem({
  className,
  children,
  ...props
}: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        "flex min-h-8 px-2 py-1 rounded-lg",
        "cursor-default select-none",
        "data-disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:pointer-events-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",

        "transition-all duration-200 ease-in-out",
        "opacity-80 hover:opacity-100",
        className
      )}
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  );
}

function AutocompleteGroup({
  className,
  ...props
}: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      className={className}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      className={cn(
        "text-xs font-medium text-muted-foreground px-2 py-1",
        className
      )}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

function AutocompleteSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      className={cn("h-px w-full bg-border my-1", className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}
export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteClear,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteStatus,
  AutocompleteEmpty,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
};
