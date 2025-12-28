import { cn } from "@inset/ui/lib/utils";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

function Label({
  className,
  render,
  ...props
}: useRender.ComponentProps<"label">) {
  const defaultProps = {
    className: cn(
      "text-base font-medium text-foreground inline-flex items-center sm:text-sm pl-0.5 gap-2",
      className
    ),
    "data-slot": "label",
    ...props,
  };

  return useRender({
    defaultTagName: "label",
    props: mergeProps<"label">(defaultProps, props),
    render,
  });
}

export { Label };
