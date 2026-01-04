import type { ReactNode } from 'react';
import { cn } from '@inset/ui/lib/utils';

interface DocsPageProps {
  children: ReactNode;
  className?: string;
}

export function DocsPage({ children, className }: DocsPageProps) {
  return (
    <article
      className={cn('mx-auto h-[calc(100vh-3.5rem)] w-full overflow-y-auto p-4 md:p-6', className)}
      data-slot="docs-page"
    >
      {children}
    </article>
  );
}

interface DocsPageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DocsPageHeader({ children, className }: DocsPageHeaderProps) {
  return (
    <header className={cn('mb-8 space-y-2', className)} data-slot="docs-page-header">
      {children}
    </header>
  );
}

interface DocsPageTitleProps {
  children: ReactNode;
  className?: string;
}

export function DocsPageTitle({ children, className }: DocsPageTitleProps) {
  return (
    <h1
      className={cn('text-foreground text-3xl font-bold tracking-tight md:text-4xl', className)}
      data-slot="docs-page-title"
    >
      {children}
    </h1>
  );
}

interface DocsPageDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function DocsPageDescription({ children, className }: DocsPageDescriptionProps) {
  return (
    <p
      className={cn('text-muted-foreground text-base md:text-lg', className)}
      data-slot="docs-page-description"
    >
      {children}
    </p>
  );
}

interface DocsPageContentProps {
  children: ReactNode;
  className?: string;
}

export function DocsPageContent({ children, className }: DocsPageContentProps) {
  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        // Headings
        '[&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight',
        '[&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight',
        '[&_h4]:mt-6 [&_h4]:scroll-mt-24 [&_h4]:text-lg [&_h4]:font-semibold',
        // Paragraphs and text
        '[&_p]:text-foreground/90 [&_p]:leading-7',
        // Links
        '[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline',
        // Lists
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
        '[&_li]:mt-2',
        // Code
        '[&_code]:bg-muted [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
        '[&_pre]:bg-muted [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        // Blockquotes
        '[&_blockquote]:border-border [&_blockquote]:text-muted-foreground [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic',
        // Tables
        '[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse',
        '[&_th]:border-border [&_th]:bg-muted [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold',
        '[&_td]:border-border [&_td]:border [&_td]:px-4 [&_td]:py-2',
        // Horizontal rule
        '[&_hr]:border-border [&_hr]:my-8',
        className
      )}
      data-slot="docs-page-content"
    >
      {children}
    </div>
  );
}
