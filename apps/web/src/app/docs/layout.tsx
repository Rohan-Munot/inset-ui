import { DocsLayout, DocsSidebar, DocsHeader, DocsHeaderThemeToggle } from '@/components/docs';
import { source } from '@/lib/source';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree}>
      <DocsHeader title="Inset UI">
        <DocsHeaderThemeToggle />
      </DocsHeader>
      <div className="mx-auto flex w-full max-w-7xl">
        <DocsSidebar tree={source.pageTree} />
        <main className="flex-1">{children}</main>
      </div>
    </DocsLayout>
  );
}
