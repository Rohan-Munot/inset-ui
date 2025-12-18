"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "@inset/ui/lib/utils";

// Root component
function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

// Portal component
function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

// Trigger component
function AlertDialogTrigger({
  className,
  ...props
}: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-3 py-2 text-sm font-medium",
        "bg-primary text-primary-foreground border border-border",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.08)]",
        "drop-shadow-sm",
        "hover:bg-primary/90",
        "focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-ring outline-offset-2",
        "transition-all duration-200 ease-in-out",
        "active:scale-95 ",
        className
      )}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

// Backdrop component
function AlertDialogBackdrop({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 backdrop-blur-xs bg-black/5",
        "transition-opacity duration-200 ease-in-out",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  );
}

// Viewport component
function AlertDialogViewport({
  className,
  ...props
}: AlertDialogPrimitive.Viewport.Props) {
  return (
    <AlertDialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 grid grid-rows-[1fr_auto] justify-items-center pt-6 sm:grid-rows-[1fr_auto_3fr] sm:p-4",
        className
      )}
      data-slot="alert-dialog-viewport"
      {...props}
    />
  );
}

// Popup component
function AlertDialogPopup({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPrimitive.Popup
          className={cn(
            "absolute bottom-0 sm:bottom-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-[calc(1.05rem*var(--nested-dialogs))]",
            "w-full max-w-md p-5 will-change-transform bg-clip-border",
            "bg-card text-card-foreground",
            "border border-border/90 data-nested-dialog-open:rounded-xs sm:rounded-xl",
            "shadow-2xl shadow-black/10",
            "transition-[scale,translate,opacity] duration-200 ease-in-out",
            "data-ending-style:translate-y-1/2 data-ending-style:opacity-0 sm:data-ending-style:scale-50 data-nested-dialog-open:origin-top scale-[calc(1-0.01*var(--nested-dialogs))] sm:scale-[calc(1-0.08*var(--nested-dialogs))]",
            "data-starting-style:translate-y-1/2 data-starting-style:opacity-0 sm:data-starting-style:scale-50",
            className
          )}
          data-slot="alert-dialog-popup"
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

// Title component
function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground",
        className
      )}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

// Description component
function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm text-muted-foreground mt-2 mb-6", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

// Close component
function AlertDialogClose({
  className,
  ...props
}: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-4 py-1.5 text-sm font-medium",
        "bg-secondary text-secondary-foreground",
        "hover:bg-secondary/30",
        "focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-ring outline-offset-2",
        "transition-all duration-200 ease-in-out",
        className
      )}
      data-slot="alert-dialog-close"
      {...props}
    />
  );
}

// Named exports for composition
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
};
