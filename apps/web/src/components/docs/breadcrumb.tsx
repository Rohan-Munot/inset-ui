'use client';

import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import type * as PageTree from 'fumadocs-core/page-tree';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  tree: PageTree.Root;
}

export function Breadcrumb({ tree }: BreadcrumbProps) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-4 flex items-center gap-1 text-sm"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && <ChevronRight className="text-muted-foreground/50 mx-1 size-4" />}
          {item.url ? (
            <Link href={item.url} className="hover:text-foreground transition-colors duration-200">
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
