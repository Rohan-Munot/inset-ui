import { DocsLayout, DocsSidebar, DocsHeader, DocsHeaderThemeToggle } from '@/components/docs';
import { getDocsTree } from '@/lib/mdx';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const tree = getDocsTree();
  
  return (
    <DocsLayout tree={tree}>
      <DocsHeader title="Inset UI">
        <DocsHeaderThemeToggle />
      </DocsHeader>
      <div className="mx-auto flex w-full max-w-7xl">
        <DocsSidebar tree={tree} />
        <main className="flex-1">{children}</main>
      </div>
    </DocsLayout>
  );
}
