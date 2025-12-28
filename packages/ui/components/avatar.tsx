import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@inset/ui/lib/utils";

function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full items-center justify-center align-middle size-9",
        className
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full object-cover ", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "size-full object-cover bg-muted rounded-full flex items-center justify-center",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}
export { Avatar, AvatarImage, AvatarFallback };
