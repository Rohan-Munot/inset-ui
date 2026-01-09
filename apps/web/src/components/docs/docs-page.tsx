import type { ReactNode } from 'react';
import { cn } from '@inset/ui/lib/utils';
import { ScrollArea } from '@inset/ui/scroll-area';

interface DocsPageProps {
  children: ReactNode;
  className?: string;
}

export function DocsPage({ children, className }: DocsPageProps) {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
      <article
        className={cn('mx-auto w-full max-w-3xl p-6 md:p-7', className)}
        data-slot="docs-page"
      >
        {children}
      </article>
    </ScrollArea>
  );
}

interface DocsPageHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DocsPageHeader({ children, className }: DocsPageHeaderProps) {
  return (
    <header className={cn('mb-10 space-y-2', className)} data-slot="docs-page-header">
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
      className={cn(
        'text-foreground scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl',
        className
      )}
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
    <p className={cn('text-muted-foreground text-lg', className)} data-slot="docs-page-description">
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
        // Headings
        '[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight first:[&_h2]:mt-0',
        '[&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight',
        '[&_h4]:mt-6 [&_h4]:scroll-mt-24 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:tracking-tight',
        '[&_h2_svg]:hidden [&_h3_svg]:hidden [&_h4_svg]:hidden',

        // Text & Typography
        '[&_p]:text-foreground/90 [&_p]:leading-7 [&_p]:not-first:mt-3',
        '[&_strong]:text-foreground [&_strong]:font-semibold',

        // Links
        '[&_a]:decoration-muted-foreground/40 hover:[&_a]:decoration-foreground hover:[&_a]:text-foreground transition-colors [&_a]:font-medium',

        // Lists
        '[&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
        '[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
        '[&_li]:leading-7',

        // Code Blocks & Inline Code
        // FIX: Removed border, bg, and rounded from generic 'pre' to avoid double-styling with Fumadocs wrappers
        '[&_pre]:overflow-x-auto',

        // Keep inline code styling
        '[&_code]:bg-muted/60 [&_code]:text-foreground [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',

        // Ensure code inside pre blocks doesn't double-dip on the inline styles
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:leading-normal',

        // Blockquotes
        '[&_blockquote]:border-primary/20 [&_blockquote]:text-muted-foreground [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic',

        // Tables
        '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:text-sm',
        '[&_tr]:border-border hover:[&_tr]:bg-muted/50 transition-colors [&_tr]:border-b last:[&_tr]:border-0',
        '[&_th]:text-muted-foreground [&_th]:h-10 [&_th]:px-4 [&_th]:text-left [&_th]:font-medium',
        '[&_td]:p-4 [&_td]:align-middle',

        // Media
        '[&_img]:bg-muted [&_img]:rounded-lg [&_img]:border [&_img]:shadow-sm',
        '[&_hr]:border-border [&_hr]:my-8',

        className
      )}
      data-slot="docs-page-content"
    >
      {children}
    </div>
  );
}
