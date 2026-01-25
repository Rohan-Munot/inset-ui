'use client';

import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc';
import { useRef } from 'react';
import { cn } from '@inset/ui/lib/utils';

interface TableOfContentsProps {
  toc: TOCItemType[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        On this page
      </p>
      <AnchorProvider toc={toc}>
        <div ref={viewRef} className="no-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          <ScrollProvider containerRef={viewRef}>
            <nav className="flex flex-col gap-2">
              {toc.map((item) => (
                <TOCItem
                  key={item.url}
                  href={item.url}
                  className={cn(
                    'text-muted-foreground hover:text-foreground block text-sm transition-colors duration-200',
                    'data-[active=true]:text-foreground data-[active=true]:font-medium',
                    'tracking-wide',
                    item.depth > 2 && 'pl-3',
                    item.depth > 3 && 'pl-6'
                  )}
                >
                  {item.title}
                </TOCItem>
              ))}
            </nav>
          </ScrollProvider>
        </div>
      </AnchorProvider>
    </div>
  );
}
