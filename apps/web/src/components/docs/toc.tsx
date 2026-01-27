'use client';

import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@inset/ui/lib/utils';

interface TableOfContentsProps {
  toc: TOCItemType[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateIndicator = () => {
      const activeElement = nav.querySelector('[data-active="true"]') as HTMLAnchorElement | null;

      if (activeElement) {
        setIndicator({
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
        const href = activeElement.getAttribute('href');
        setActiveUrl(href);
      } else {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        setActiveUrl(null);
      }
    };

    // Initial check
    updateIndicator();

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-active') {
          updateIndicator();
        }
      }
    });

    observer.observe(nav, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-active'],
    });

    return () => observer.disconnect();
  }, [toc]);

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
            <nav ref={navRef} className="relative flex flex-col gap-1">
              {/* Dynamic indicator line */}
              <div
                className="from-primary/80 via-primary to-primary/80 absolute left-0 w-[2px] rounded-full bg-gradient-to-b shadow-[0_0_8px_rgba(var(--primary),0.3)] transition-all duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)]"
                style={{
                  top: indicator.top,
                  height: indicator.height > 0 ? 20 : 0,
                  transform: `translateY(${indicator.height > 0 ? (indicator.height - 20) / 2 : 0}px)`,
                  opacity: indicator.opacity,
                }}
              />

              {/* Border backdrop */}
              <div className="bg-border/30 absolute top-0 bottom-0 left-0 w-[1px]" />

              {toc.map((item) => {
                const isActive = activeUrl === item.url;
                return (
                  <TOCItem
                    key={item.url}
                    href={item.url}
                    className={cn(
                      'ml-2 items-center p-1 text-sm transition-colors duration-200',
                      'text-muted-foreground hover:text-foreground',
                      isActive && 'text-foreground font-medium',
                      'tracking-wide',
                      item.depth > 2 && 'pl-4',
                      item.depth > 3 && 'pl-6'
                    )}
                  >
                    {item.title}
                  </TOCItem>
                );
              })}
            </nav>
          </ScrollProvider>
        </div>
      </AnchorProvider>
    </div>
  );
}
