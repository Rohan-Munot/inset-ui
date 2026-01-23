import { source } from '@/lib/source';
import { Sidebar } from '@/components/docs/sidebar';
import type { ReactNode } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <div className="flex min-h-screen">
      <Sidebar tree={tree} />
      <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
