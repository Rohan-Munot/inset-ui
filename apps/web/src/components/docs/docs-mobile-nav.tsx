'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDocsContext } from './docs-layout';
import { cn } from '@inset/ui/lib/utils';
import type * as PageTree from 'fumadocs-core/page-tree';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@inset/ui/collapsible';

interface DocsMobileNavProps {
  className?: string;
}

export function DocsMobileNav({ className }: DocsMobileNavProps) {
  const { tree, sidebarOpen, setSidebarOpen } = useDocsContext();
  const pathname = usePathname();

  // Close sidebar when pathname changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen, setSidebarOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleOverlayClick = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  if (!sidebarOpen) return null;

  return (
    <div
      data-slot="docs-mobile-nav"
      className={cn('fixed inset-0 z-50 md:hidden', className)}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="absolute left-0 top-0 h-full w-72 max-w-[80vw] border-r border-border bg-background shadow-xl animate-in slide-in-from-left duration-300">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            <Link
              href="/"
              className="text-lg font-semibold"
              onClick={() => setSidebarOpen(false)}
            >
              {tree.name}
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <MobileSidebarTree nodes={tree.children} />
          </nav>
        </div>
      </aside>
    </div>
  );
}

function MobileSidebarTree({ nodes }: { nodes: PageTree.Node[] }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node, index) => (
        <MobileSidebarNode key={index} node={node} />
      ))}
    </ul>
  );
}

function MobileSidebarNode({ node }: { node: PageTree.Node }) {
  switch (node.type) {
    case 'page':
      return <MobileSidebarItem item={node} />;
    case 'folder':
      return <MobileSidebarFolder folder={node} />;
    case 'separator':
      return <MobileSidebarSeparator name={node.name} />;
    default:
      return null;
  }
}

function MobileSidebarItem({ item }: { item: PageTree.Item }) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <li>
      <Link
        href={item.url}
        className={cn(
          'block rounded-md px-3 py-2 text-sm transition-colors duration-200',
          isActive
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
        )}
      >
        {item.name}
      </Link>
    </li>
  );
}

function MobileSidebarFolder({ folder }: { folder: PageTree.Folder }) {
  const pathname = usePathname();

  // Check if current path is inside this folder
  const isOpen =
    folder.index?.url === pathname ||
    folder.children.some(
      (child) =>
        (child.type === 'page' && child.url === pathname) ||
        (child.type === 'folder' && isPathInFolder(pathname, child))
    );

  return (
    <li>
      <Collapsible defaultOpen={isOpen || folder.defaultOpen}>
        <CollapsibleTrigger className="w-full rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/50">
          {folder.name}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ml-3 border-l border-border pl-3 pt-1">
            {folder.index && (
              <MobileSidebarItem
                item={{ ...folder.index, name: 'Overview' } as PageTree.Item}
              />
            )}
            {folder.children.map((child, index) => (
              <MobileSidebarNode key={index} node={child} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function MobileSidebarSeparator({ name }: { name?: React.ReactNode }) {
  return (
    <li className="pb-2 pt-4">
      <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {name}
      </span>
    </li>
  );
}

function isPathInFolder(pathname: string, folder: PageTree.Folder): boolean {
  if (folder.index?.url === pathname) return true;
  return folder.children.some(
    (child) =>
      (child.type === 'page' && child.url === pathname) ||
      (child.type === 'folder' && isPathInFolder(pathname, child))
  );
}
