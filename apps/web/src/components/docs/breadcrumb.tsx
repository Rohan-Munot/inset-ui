'use client';

import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import type * as PageTree from 'fumadocs-core/page-tree';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Fragment } from 'react';

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
    <nav className="text-muted-foreground mb-4 flex items-center gap-1 text-sm">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && (
            <span className="text-muted-foreground/50 mx-1">/</span>
          )}
          {item.url ? (
            <Link
              href={item.url}
              className="hover:text-foreground transition-colors duration-200"
            >
              {item.name}
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
