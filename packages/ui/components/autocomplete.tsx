import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { cn } from "@inset/ui/lib/utils";

const Autocomplete = AutocompletePrimitive.Root;
function AutocompleteInput({
  className,
  ...props
}: AutocompletePrimitive.Input.Props) {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
      <AutocompletePrimitive.Input
        className={cn(
          "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-inner transition-all duration-200 ease-in-out",
          "focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-ring/50 outline-offset-2",
          "hover:border-border/80",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        data-slot="autocomplete-input"
        {...props}
      />
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
    <AutocompletePrimitive.List
      className={className}
      data-slot="autocomplete-list"
      {...props}
    />
  );
}

function AutocompletePopup({
  children,
  className,
  ...props
}: AutocompletePrimitive.Popup.Props) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner>
        <AutocompletePrimitive.Popup
          className={className}
          data-slot="autocomplete-popup"
          {...props}
        >
          {children}
        </AutocompletePrimitive.Popup>
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
      className={className}
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
      className={className}
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
      className={className}
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
      className={className}
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
