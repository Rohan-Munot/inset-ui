'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@inset/ui/lib/utils';
import type * as PageTree from 'fumadocs-core/page-tree';
import { useState } from 'react';

interface SearchResult {
  title: string;
  url: string;
  description?: string;
  type: 'page' | 'heading';
}

interface DocsSearchProps {
  tree: PageTree.Root;
  onClose: () => void;
  className?: string;
}

export function DocsSearch({ tree, onClose, className }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Flatten tree into searchable items
  const searchableItems = useMemo(() => {
    const items: SearchResult[] = [];

    function traverse(nodes: PageTree.Node[]) {
      for (const node of nodes) {
        if (node.type === 'page') {
          items.push({
            title: String(node.name),
            url: node.url,
            description: node.description ? String(node.description) : undefined,
            type: 'page',
          });
        } else if (node.type === 'folder') {
          if (node.index) {
            items.push({
              title: String(node.name),
              url: node.index.url,
              description: node.description ? String(node.description) : undefined,
              type: 'page',
            });
          }
          traverse(node.children);
        }
      }
    }

    traverse(tree.children);
    return items;
  }, [tree]);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return searchableItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10);
  }, [query, searchableItems]);

  // Handle keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle navigation
  const handleSelect = useCallback(
    (url: string) => {
      router.push(url);
      onClose();
      setQuery('');
    },
    [router, onClose]
  );

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      data-slot="docs-search"
      className={cn(
        'bg-background/80 fixed inset-0 z-100 flex items-start justify-center pt-[10vh] backdrop-blur-sm md:pt-[15vh]',
        className
      )}
      onClick={handleBackdropClick}
    >
      <div className="border-border bg-background w-full max-w-xl rounded-xl border shadow-2xl">
        {/* Search Input */}
        <div className="border-border flex items-center gap-3 border-b px-4">
          <SearchIcon className="text-muted-foreground size-5 shrink-0" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground h-14 flex-1 bg-transparent text-base focus:outline-none"
            autoFocus
          />
          <kbd className="border-border bg-muted text-muted-foreground hidden h-6 items-center gap-1 rounded border px-2 font-mono text-xs font-medium select-none sm:flex">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="text-muted-foreground px-4 py-8 text-center text-sm">
              Type to search the documentation...
            </div>
          ) : results.length === 0 ? (
            <div className="text-muted-foreground px-4 py-8 text-center text-sm">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((result) => (
                <li key={result.url}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result.url)}
                    className="hover:bg-accent flex w-full flex-col items-start gap-1 rounded-lg px-4 py-3 text-left transition-colors"
                  >
                    <span className="text-foreground font-medium">{result.title}</span>
                    {result.description && (
                      <span className="text-muted-foreground line-clamp-1 text-sm">
                        {result.description}
                      </span>
                    )}
                    <span className="text-muted-foreground/70 text-xs">{result.url}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-border text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="border-border bg-muted rounded border px-1.5 py-0.5">↑</kbd>
              <kbd className="border-border bg-muted rounded border px-1.5 py-0.5">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border-border bg-muted rounded border px-1.5 py-0.5">↵</kbd>
              <span>Select</span>
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="border-border bg-muted rounded border px-1.5 py-0.5">ESC</kbd>
            <span>Close</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Search trigger button
interface DocsSearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function DocsSearchTrigger({ onClick, className }: DocsSearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors',
        className
      )}
      aria-label="Search documentation"
    >
      <SearchIcon className="size-4" />
      <span className="hidden sm:inline-block">Search...</span>
      <kbd className="border-border bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
