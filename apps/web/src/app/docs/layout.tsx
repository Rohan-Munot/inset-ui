import { source } from '@/lib/source';
import { DocsLayout, DocsSidebar, DocsHeader, DocsMobileNav } from '@/components/docs';
import { DocsHeaderActions } from '@/components/docs/docs-header-actions';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree}>
      {/* Header - stays fixed at top */}
      <DocsHeader
        title="Inset UI"
        links={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Components', href: '/docs/components' },
          { label: 'GitHub', href: 'https://github.com', external: true },
        ]}
      >
        <DocsHeaderActions />
      </DocsHeader>

      {/* Content area fills remaining height */}
      <div className="mx-auto flex w-full max-w-7xl overflow-y-hidden">
        <DocsSidebar tree={source.pageTree} />
        <main className="border-border min-w-0 flex-1 border-dashed xl:border-r">{children}</main>
      </div>

      <DocsMobileNav />
    </DocsLayout>
  );
}
