import * as React from 'react';
import Link from 'next/link';
import { cn } from '@inset/ui/lib/utils';

interface ComponentItem {
  name: string;
  href: string;
  description?: string;
}

interface ComponentsListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ComponentItem[];
}

function ComponentsList({ items = [], className, ...props }: ComponentsListProps) {
  return (
    <div
      data-slot="components-list"
      className={cn(
        'my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
        >
          <h3 className="font-medium text-foreground group-hover:text-accent-foreground">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}

export { ComponentsList };
