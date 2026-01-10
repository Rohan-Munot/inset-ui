'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface CodeTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: string[];
  defaultValue?: string;
}

function CodeTabs({
  items = [],
  defaultValue,
  className,
  children,
  ...props
}: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue ?? items[0] ?? '');

  // Extract tab content from children
  const childArray = React.Children.toArray(children);

  return (
    <div data-slot="code-tabs" className={cn('my-4', className)} {...props}>
      {items.length > 0 && (
        <div className="flex items-center gap-2 border-b border-border">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={cn(
                'border-b-2 px-3 py-2 text-sm font-medium transition-colors',
                activeTab === item
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="mt-0">
        {childArray.map((child, index) => {
          const item = items[index];
          if (!item || activeTab !== item) return null;
          return <React.Fragment key={item}>{child}</React.Fragment>;
        })}
      </div>
    </div>
  );
}

export { CodeTabs };
