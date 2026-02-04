'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ComponentPreview({ children, className, ...props }: ComponentPreviewProps) {
  return (
    <div className={cn('group relative flex flex-col', className)} {...props}>
      <div className="border-border text-card-foreground flex w-full items-center justify-center rounded-xl border p-4 py-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
