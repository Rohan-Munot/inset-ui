import {
  DocsPage,
  DocsPageHeader,
  DocsPageTitle,
  DocsPageDescription,
  DocsPageContent,
  DocsToc,
  DocsFooter,
} from '@/components/docs';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllDocs, getDocBySlug, getNeighbours } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { transformers } from '@/lib/highlight-code';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params.slug || ['index']; // Handle root /docs
  const page = await getDocBySlug(slug);

  if (!page) notFound();

  // Get previous/next pages for footer navigation
  const neighbours = getNeighbours(page.url);

  return (
    <div className="flex w-full">
      <DocsPage>
        {/* Page Header */}
        <DocsPageHeader>
          <DocsPageTitle>{page.frontmatter.title}</DocsPageTitle>
          {page.frontmatter.description && (
            <DocsPageDescription>{page.frontmatter.description}</DocsPageDescription>
          )}
        </DocsPageHeader>

        {/* Page Content */}
        <DocsPageContent>
          <MDXRemote
            source={page.content}
            components={getMDXComponents({
              a: (props) => <Link {...(props as any)} />,
            })}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                      },
                    },
                  ],
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: 'github-dark',
                        light: 'github-light',
                      },
                      transformers,
                    },
                  ],
                ],
              },
            }}
          />
        </DocsPageContent>

        {/* Footer Navigation */}
        <DocsFooter 
          previous={neighbours.previous ? { name: neighbours.previous.name, url: neighbours.previous.url! } : undefined} 
          next={neighbours.next ? { name: neighbours.next.name, url: neighbours.next.url! } : undefined} 
        />
      </DocsPage>

      {/* Desktop TOC */}
      <DocsToc toc={page.toc} />
    </div>
  );
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug || ['index'];
  const page = await getDocBySlug(slug);

  if (!page) return {};

  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
  };
}
