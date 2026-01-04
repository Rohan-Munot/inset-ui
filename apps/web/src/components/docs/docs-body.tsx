import { cn } from '@inset/ui/lib/utils';
import type { ReactNode } from 'react';

interface DocsBodyProps {
  children: ReactNode;
  className?: string;
}

export function DocsBody({ children, className }: DocsBodyProps) {
  return (
    <div
      data-slot="docs-body"
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        // Headings
        '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight',
        '[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:scroll-mt-24 [&_h2]:mt-10 [&_h2]:mb-4',
        '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:scroll-mt-24 [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_h4]:text-lg [&_h4]:font-medium [&_h4]:scroll-mt-24 [&_h4]:mt-6 [&_h4]:mb-2',
        // Paragraphs and text
        '[&_p]:leading-7 [&_p]:text-foreground/80',
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        // Links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-primary/80',
        // Lists
        '[&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc',
        '[&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal',
        '[&_li]:mt-2 [&_li]:text-foreground/80',
        // Code
        '[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono',
        '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        // Blockquotes
        '[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
        // Tables
        '[&_table]:w-full [&_table]:my-6 [&_table]:overflow-hidden [&_table]:rounded-lg [&_table]:border [&_table]:border-border',
        '[&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold',
        '[&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-2',
        // Horizontal rule
        '[&_hr]:my-8 [&_hr]:border-border',
        // Images
        '[&_img]:rounded-lg [&_img]:border [&_img]:border-border',
        className
      )}
    >
      {children}
    </div>
  );
}
