import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/docs/mdx-content';
import { TableOfContents } from '@/components/docs/toc';
import { Breadcrumb } from '@/components/docs/breadcrumb';
import type { Metadata } from 'next';
import type { MDXContent as MDXContentType } from 'mdx/types';
import type { TOCItemType } from 'fumadocs-core/toc';

import { ComponentPreview } from '@/components/component-preview';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const tree = source.getPageTree();
  const data = page.data as typeof page.data & {
    body: MDXContentType;
    toc: TOCItemType[];
  };
  const { body: MDX, toc } = data;

  return (
    <div className="relative grid h-full xl:grid-cols-[1fr_240px] xl:gap-8">
      <article className="flex min-w-0 flex-1 flex-col gap-8 py-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{page.data.title}</h1>
          {page.data.description && (
            <p className="text-muted-foreground text-lg">{page.data.description}</p>
          )}
        </div>
        <MDXContent>
          <MDX components={{ ComponentPreview }} />
        </MDXContent>
      </article>
      <aside className="border-border hidden w-full shrink-0 border-x border-dashed p-4 lg:block">
        <div className="sticky top-20">
          <TableOfContents toc={toc} />
        </div>
      </aside>
    </div>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.data.title} | Inset UI`,
    description: page.data.description,
  };
}
