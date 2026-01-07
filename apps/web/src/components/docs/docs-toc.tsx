'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@inset/ui/lib/utils';
import type { ReactNode } from 'react';
interface TOCItem {
  title: ReactNode;
  url: string;
  depth: number;
}

interface DocsTocProps {
  toc: TOCItem[];
  title?: string;
  className?: string;
}

export function DocsToc({ toc, title = 'On this page', className }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    // Get all heading elements that match our TOC
    const headingIds = toc.map((item) => item.url.slice(1)); // Remove '#'
    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all headings
    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [toc]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const element = document.getElementById(url.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without scrolling
      window.history.pushState(null, '', url);
    }
  }, []);

  if (toc.length === 0) return null;

  return (
    <aside
      data-slot="docs-toc"
      className={cn(
        'border-border sticky top-0 hidden w-56 shrink-0 border-l border-dashed p-4 xl:block',
        className
      )}
    >
      <nav className="space-y-3">
        <p className="text-foreground text-sm font-medium">{title}</p>
        <ul className="space-y-2 text-sm">
          {toc.map((item) => (
            <TocItem
              key={item.url}
              item={item}
              isActive={activeId === item.url.slice(1)}
              onClick={handleClick}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

interface TocItemProps {
  item: TOCItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void;
}

function TocItem({ item, isActive, onClick }: TocItemProps) {
  return (
    <li>
      <a
        href={item.url}
        onClick={(e) => onClick(e, item.url)}
        className={cn(
          'block py-1 transition-colors duration-200',
          // Indentation based on depth
          item.depth === 2 && 'pl-0',
          item.depth === 3 && 'pl-4',
          item.depth === 4 && 'pl-8',
          // Active state
          isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {item.title}
      </a>
    </li>
  );
}

// Popover version for mobile/tablet
interface DocsTocPopoverProps {
  toc: TOCItem[];
  title?: string;
}

export function DocsTocPopover({ toc, title = 'On this page' }: DocsTocPopoverProps) {
  const [open, setOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <div data-slot="docs-toc-popover" className="relative lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="border-border bg-background text-foreground hover:bg-accent flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
      >
        <span>{title}</span>
        <svg
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border p-4 shadow-lg">
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground block py-1 transition-colors',
                    item.depth === 2 && 'pl-0',
                    item.depth === 3 && 'pl-4',
                    item.depth === 4 && 'pl-8'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
