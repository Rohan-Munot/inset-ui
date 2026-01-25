'use client';

import type * as PageTree from 'fumadocs-core/page-tree';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@inset/ui/lib/utils';

interface SidebarProps {
  tree: PageTree.Root;
}

export function Sidebar({ tree }: SidebarProps) {
  return (
    <aside className="border-sidebar-border sticky top-0 hidden h-screen w-full shrink-0 border-dashed md:block xl:border-x">
      <div className="no-scrollbar h-full overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          {tree.children.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  item: PageTree.Node;
}

function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();

  if (item.type === 'page') {
    const isActive = pathname === item.url;

    return (
      <Link
        href={item.url}
        className={cn(
          'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
          isActive &&
            'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm inset-shadow-sm shadow-black/5 inset-shadow-white/10'
        )}
      >
        {item.name}
      </Link>
    );
  }

  if (item.type === 'folder') {
    return (
      <div className="flex flex-col gap-1">
        {item.index ? (
          <Link
            href={item.index.url}
            className={cn(
              'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200',
              pathname === item.index.url &&
                'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm inset-shadow-sm shadow-black/5 inset-shadow-white/10'
            )}
          >
            {item.name}
          </Link>
        ) : (
          <span className="text-muted-foreground px-3 py-2 text-xs font-semibold tracking-wider uppercase">
            {item.name}
          </span>
        )}
        {item.children && item.children.length > 0 && (
          <div className="border-border/50 ml-2 flex flex-col gap-1 border-l pl-2">
            {item.children.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.type === 'separator') {
    return (
      <div className="my-2 flex items-center gap-2">
        <div className="bg-border h-px flex-1" />
        {item.name && (
          <span className="text-muted-foreground text-xs font-medium">{item.name}</span>
        )}
        <div className="bg-border h-px flex-1" />
      </div>
    );
  }

  return null;
}
