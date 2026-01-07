'use client';

import type * as PageTree from 'fumadocs-core/page-tree';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@inset/ui/lib/utils';

interface DocsSidebarProps {
  tree: PageTree.Root;
}

export function DocsSidebar({ tree }: DocsSidebarProps) {
  return (
    <aside
      data-slot="docs-sidebar"
      className="border-border bg-background sticky top-0 hidden w-64 shrink-0 overflow-y-auto border-x border-dashed md:block"
    >
      <nav className="p-4">
        <SidebarTree nodes={tree.children} />
      </nav>
    </aside>
  );
}

function SidebarTree({ nodes }: { nodes: PageTree.Node[] }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node, index) => (
        <SidebarNode key={index} node={node} />
      ))}
    </ul>
  );
}

function SidebarNode({ node }: { node: PageTree.Node }) {
  switch (node.type) {
    case 'page':
      return <SidebarItem item={node} />;
    case 'folder':
      return <SidebarFolder folder={node} />;
    case 'separator':
      return <SidebarSeparator name={node.name} />;
    default:
      return null;
  }
}

function SidebarItem({ item }: { item: PageTree.Item }) {
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
          // 'data-[active=true]:underline data-[active=true]:underline-offset-4'
        )}
      >
        {item.name}
      </Link>
    </li>
  );
}

function SidebarFolder({ folder }: { folder: PageTree.Folder }) {
  return (
    <li>
      <div className="text-foreground mt-1.5 flex h-7 items-center px-3 text-sm font-medium tracking-wide">
        {folder.name}
      </div>
      <ul className="border-border ml-2.5 border-l">
        {folder.children.map((child, index) => (
          <SidebarNode key={index} node={child} />
        ))}
      </ul>
    </li>
  );
}

function SidebarSeparator({ name }: { name?: React.ReactNode }) {
  return (
    <li className="pt-4 pb-2">
      <span className="text-muted-foreground px-3 text-xs font-semibold tracking-wider uppercase">
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
