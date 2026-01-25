'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ComponentPreview({ children, className, ...props }: ComponentPreviewProps) {
  return (
    <div className={cn('group relative my-4 flex flex-col space-y-2', className)} {...props}>
      <div className="border-border text-card-foreground flex min-h-[350px] w-full items-center justify-center rounded-xl border p-10 shadow-sm">
        {children}
      </div>
    </div>
  );
}
