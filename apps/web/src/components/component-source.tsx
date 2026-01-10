'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
}

function ComponentSource({
  name,
  src,
  className,
  children,
  ...props
}: ComponentSourceProps) {
  return (
    <div
      data-slot="component-source"
      data-name={name}
      data-src={src}
      className={cn(
        'relative my-4 overflow-hidden rounded-lg border bg-muted/50',
        className
      )}
      {...props}
    >
      <div className="max-h-[650px] overflow-auto">{children}</div>
    </div>
  );
}

export { ComponentSource };
