'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  icon?: React.ReactNode;
}

function Callout({
  title,
  type = 'info',
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      data-slot="callout"
      data-type={type}
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        type === 'info' && 'border-info/50 bg-info/10 text-info-foreground',
        type === 'warning' && 'border-warning/50 bg-warning/10 text-warning-foreground',
        type === 'error' && 'border-destructive/50 bg-destructive/10 text-destructive-foreground',
        type === 'success' && 'border-success/50 bg-success/10 text-success-foreground',
        className
      )}
      {...props}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="flex-1 space-y-1">
        {title && <p className="font-medium leading-none">{title}</p>}
        <div className="text-sm [&_p]:leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export { Callout };
