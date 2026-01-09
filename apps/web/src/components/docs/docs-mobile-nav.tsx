'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDocsContext } from './docs-layout';
import { cn } from '@inset/ui/lib/utils';
import type * as PageTree from 'fumadocs-core/page-tree';
import { XIcon } from '@phosphor-icons/react';

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
    <div data-slot="docs-mobile-nav" className={cn('fixed inset-0 z-50 md:hidden', className)}>
      {/* Overlay */}
      <div
        className="bg-background/80 absolute inset-0 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="border-border bg-background animate-in slide-in-from-left absolute top-0 left-0 h-full w-72 max-w-[80vw] border-r shadow-xl duration-300">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-border flex h-14 items-center justify-between border-b px-4">
            <Link href="/" className="text-lg font-semibold" onClick={() => setSidebarOpen(false)}>
              {tree.name}
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
              aria-label="Close navigation menu"
            >
              <XIcon size={24} />
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
        data-active={isActive}
        className={cn(
          'flex items-center',
          'data-[active=true]:text-accent-foreground data-[active=false]:text-muted-foreground data-[active=false]:hover:text-foreground h-7 rounded-md px-3 text-sm leading-5 font-medium tracking-wide transition-colors duration-200'
        )}
      >
        {item.name}
      </Link>
    </li>
  );
}

function MobileSidebarFolder({ folder }: { folder: PageTree.Folder }) {
  return (
    <li>
      <div className="text-foreground mt-1.5 flex h-7 items-center px-3 text-sm font-medium tracking-wide">
        {folder.name}
      </div>
      <ul className="border-border ml-2.5 border-l">
        {folder.children.map((child, index) => (
          <MobileSidebarNode key={index} node={child} />
        ))}
      </ul>
    </li>
  );
}

function MobileSidebarSeparator({ name }: { name?: React.ReactNode }) {
  return (
    <li className="pt-4 pb-2">
      <span className="text-muted-foreground px-3 text-xs font-semibold tracking-wider uppercase">
        {name}
      </span>
    </li>
  );
}
