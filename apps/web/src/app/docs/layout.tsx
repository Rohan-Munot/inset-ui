import { source } from '@/lib/source';
import { Sidebar } from '@/components/docs/sidebar';
import type { ReactNode } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <div className="flex-1">
      <div className="container mx-auto gap-8 px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_1fr] xl:px-0">
        <Sidebar tree={tree} />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
