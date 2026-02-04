import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/docs/toc';
import type { Metadata } from 'next';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { mdxComponents } from '@/components/docs/mdx-components';

export default async function DocsPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const { body: MDX, toc } = page.data;

  return (
    <div className="relative grid h-full xl:grid-cols-[1fr_240px] xl:gap-8">
      <article className="flex min-w-0 flex-1 flex-col gap-6 py-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{page.data.title}</h1>
          {page.data.description && (
            <p className="text-muted-foreground text-lg">{page.data.description}</p>
          )}
        </div>
        <MDX components={mdxComponents} />
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
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
