import { source } from '@/lib/source';
import {
  DocsPage,
  DocsPageHeader,
  DocsPageTitle,
  DocsPageDescription,
  DocsPageContent,
  DocsToc,
  DocsTocPopover,
  DocsFooter,
} from '@/components/docs';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { findNeighbour } from 'fumadocs-core/page-tree';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  // Get previous/next pages for footer navigation
  const neighbours = findNeighbour(source.pageTree, page.url);

  return (
    <div className="mx-auto flex w-full max-w-7xl">
      <DocsPage>
        {/* Mobile TOC */}
        {/*<DocsTocPopover toc={page.data.toc} />*/}

        {/* Page Header */}
        <DocsPageHeader>
          <DocsPageTitle>{page.data.title}</DocsPageTitle>
          {page.data.description && (
            <DocsPageDescription>{page.data.description}</DocsPageDescription>
          )}
        </DocsPageHeader>

        {/* Page Content */}
        <DocsPageContent>
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsPageContent>

        {/* Footer Navigation */}
        <DocsFooter previous={neighbours.previous} next={neighbours.next} />
      </DocsPage>

      {/* Desktop TOC */}
      <DocsToc toc={page.data.toc} />
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
