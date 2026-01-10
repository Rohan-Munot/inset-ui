'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface CodeCollapsibleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

function CodeCollapsibleWrapper({
  defaultOpen = false,
  className,
  children,
  ...props
}: CodeCollapsibleWrapperProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div
      data-slot="code-collapsible-wrapper"
      data-state={isOpen ? 'open' : 'closed'}
      className={cn('relative my-4', className)}
      {...props}
    >
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          !isOpen && 'max-h-32'
        )}
      >
        {children}
        {!isOpen && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
}

export { CodeCollapsibleWrapper };
