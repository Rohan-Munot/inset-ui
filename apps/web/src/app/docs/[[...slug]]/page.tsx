import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/docs/mdx-content';
import { TableOfContents } from '@/components/docs/toc';
import { Breadcrumb } from '@/components/docs/breadcrumb';
import type { Metadata } from 'next';
import type { MDXContent as MDXContentType } from 'mdx/types';
import type { TOCItemType } from 'fumadocs-core/toc';

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
    <div className="flex flex-1 gap-8">
      <article className="min-w-0 flex-1">
        <Breadcrumb tree={tree} />
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-muted-foreground mb-8 text-lg">{page.data.description}</p>
        )}
        <MDXContent>
          <MDX />
        </MDXContent>
      </article>
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-6">
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
