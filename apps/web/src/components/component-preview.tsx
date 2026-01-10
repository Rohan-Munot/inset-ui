'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  align?: 'start' | 'center' | 'end';
}

function ComponentPreview({
  name,
  align = 'center',
  className,
  children,
  ...props
}: ComponentPreviewProps) {
  return (
    <div
      data-slot="component-preview"
      className={cn(
        'relative my-6 flex min-h-[350px] w-full items-center justify-center rounded-lg border bg-background p-10',
        align === 'start' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        className
      )}
      {...props}
    >
      <div className="preview flex w-full flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}

export { ComponentPreview };
