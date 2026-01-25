import type { ReactNode } from 'react';
import { cn } from '@inset/ui/lib/utils';

interface MDXContentProps {
  children: ReactNode;
  className?: string;
}

const mdxStyles = cn(
  // Layout - Flex column with consistent gap
  'flex flex-col gap-4',
  ' text-foreground antialiased',

  // Reset margins on direct children so gap controls the spacing
  '[&_>_*]:m-0',

  // Headings - Stark, high contrast
  // We add 'mt-8' only to headings to give them extra breathing room beyond the base gap
  '[&_h1]:text-3xl [&_h1]:font-medium [&_h1]:tracking-tighter [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:scroll-mt-24',
  '[&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-2 [&_h2]:scroll-mt-24',
  '[&_h3]:text-lg [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:scroll-mt-24',
  '[&_h4]:text-base [&_h4]:font-medium [&_h4]:tracking-tight [&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:scroll-mt-24',

  // Paragraphs
  '[&_p]:text-[16px] [&_p]:leading-7 [&_p]:text-foreground/90',

  // Links
  '[&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4',
  'hover:[&_a]:decoration-foreground [&_a]:transition-colors',

  // Lists - Semantic, indented
  '[&_ul]:pl-4 [&_ul]:list-disc [&_ul]:space-y-2',
  '[&_ol]:pl-4 [&_ol]:list-decimal [&_ol]:space-y-2',
  '[&_li]:leading-7 [&_li]:pl-2 [&_li]:marker:text-foreground/60',

  // Inline code - Technical, no background
  '[&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.9em] [&_:not(pre)>code]:font-medium',
  '[&_:not(pre)>code]:before:content-["`"] [&_:not(pre)>code]:after:content-["`"] [&_:not(pre)>code]:before:text-muted-foreground [&_:not(pre)>code]:after:text-muted-foreground',

  // Code blocks - Indented, borderless
  '[&_pre]:p-3 [&_pre]:border [&_pre]:border-border/60 [&_pre]:overflow-x-auto',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:leading-6 [&_pre_code]:font-mono',

  // Blockquotes - Simple line
  '[&_blockquote]:border-l-2 [&_blockquote]:border-foreground [&_blockquote]:pl-6 [&_blockquote]:italic',

  // Horizontal rules
  '[&_hr]:border-t [&_hr]:border-border/40',

  // Tables - Minimal grid
  '[&_table]:w-full [&_table]:text-sm',
  '[&_th]:text-left [&_th]:font-medium [&_th]:pb-4 [&_th]:border-b [&_th]:border-border',
  '[&_td]:py-3 [&_td]:border-b [&_td]:border-border/40',
  '[&_tr:last-child_td]:border-0',

  // Images
  '[&_img]:rounded-sm'
);

export function MDXContent({ children, className }: MDXContentProps) {
  return (
    <article className={cn(mdxStyles, className)} data-slot="mdx-content">
      {children}
    </article>
  );
}
