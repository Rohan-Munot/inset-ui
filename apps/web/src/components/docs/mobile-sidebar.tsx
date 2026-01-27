'use client';

import type * as PageTree from 'fumadocs-core/page-tree';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@inset/ui/lib/utils';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@inset/ui/drawer';
import * as React from 'react';
import { Menu } from 'lucide-react';

const MobileSidebarContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function useMobileSidebar() {
  const context = React.useContext(MobileSidebarContext);
  if (!context) {
    throw new Error('useMobileSidebar must be used within a MobileSidebar component');
  }
  return context;
}

interface MobileSidebarProps {
  tree: PageTree.Root;
  children?: React.ReactNode;
}

export function MobileSidebar({ tree, children }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <MobileSidebarContext.Provider value={{ open, setOpen }}>
      {children}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTitle className="hidden">Nav</DrawerTitle>
        <DrawerContent>
          <div className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 pb-6">
              <nav className="flex flex-col gap-1">
                {tree.children.map((item, index) => (
                  <MobileSidebarItem key={index} item={item} onNavigate={() => setOpen(false)} />
                ))}
              </nav>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </MobileSidebarContext.Provider>
  );
}

export function MobileSidebarTrigger() {
  const { setOpen } = useMobileSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="text-foreground hover:bg-accent hover:text-accent-foreground mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors md:hidden"
      aria-label="Open navigation menu"
    >
      <Menu className="size-5 sm:size-6" />
    </button>
  );
}

interface MobileSidebarItemProps {
  item: PageTree.Node;
  onNavigate: () => void;
}

function MobileSidebarItem({ item, onNavigate }: MobileSidebarItemProps) {
  const pathname = usePathname();

  if (item.type === 'page') {
    const isActive = pathname === item.url;

    return (
      <Link
        href={item.url}
        onClick={onNavigate}
        className={cn(
          'text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground rounded-xs p-1 px-2 text-sm font-medium transition-[background-color,color] duration-200',
          'border border-transparent',
          isActive &&
            'bg-sidebar-accent dark:bg-sidebar-accent/50 text-sidebar-accent-foreground border-border shadow-sm'
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
            onClick={onNavigate}
            className={cn(
              'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xs px-3 py-2 text-sm font-semibold transition-all duration-200',
              'border border-transparent',
              pathname === item.index.url &&
                'bg-sidebar-accent text-sidebar-accent-foreground border-border shadow-sm inset-shadow-sm shadow-black/5 inset-shadow-white/10'
            )}
          >
            {item.name}
          </Link>
        ) : (
          <span className="text-muted-foreground px-2 py-1 text-xs font-semibold tracking-wider uppercase">
            {item.name}
          </span>
        )}
        {item.children && item.children.length > 0 && (
          <div className="flex flex-col gap-1">
            {item.children.map((child, index) => (
              <MobileSidebarItem key={index} item={child} onNavigate={onNavigate} />
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
