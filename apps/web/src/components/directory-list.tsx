import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';

interface DirectoryItem {
  name: string;
  type: 'file' | 'folder';
  children?: DirectoryItem[];
}

interface DirectoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: DirectoryItem[];
}

function DirectoryList({ items = [], className, ...props }: DirectoryListProps) {
  return (
    <div
      data-slot="directory-list"
      className={cn('my-4 rounded-lg border bg-muted/30 p-4 font-mono text-sm', className)}
      {...props}
    >
      <DirectoryTree items={items} level={0} />
    </div>
  );
}

function DirectoryTree({ items, level }: { items: DirectoryItem[]; level: number }) {
  return (
    <ul className={cn('space-y-1', level > 0 && 'ml-4 border-l border-border pl-4')}>
      {items.map((item, index) => (
        <li key={`${item.name}-${index}`}>
          <div className="flex items-center gap-2">
            {item.type === 'folder' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
            )}
            <span className={cn(item.type === 'folder' && 'font-medium')}>
              {item.name}
            </span>
          </div>
          {item.children && item.children.length > 0 && (
            <DirectoryTree items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export { DirectoryList };
