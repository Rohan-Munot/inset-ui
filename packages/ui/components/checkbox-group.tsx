import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cn } from "@inset/ui/lib/utils";

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      {...props}
      className={cn("flex gap-2", className)}
    />
  );
}

export { CheckboxGroup };
