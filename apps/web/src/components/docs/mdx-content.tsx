import type { ReactNode } from 'react';
import { cn } from '@inset/ui/lib/utils';

interface MDXContentProps {
  children: ReactNode;
  className?: string;
}

const mdxStyles = cn(
  // Base
  'max-w-none text-foreground',

  // Headings
  '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:scroll-mt-20',
  '[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:scroll-mt-20 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2',
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:scroll-mt-20',
  '[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:scroll-mt-20',

  // Paragraphs
  '[&_p]:leading-7 [&_p]:mb-4 [&_p:last-child]:mb-0',

  // Links
  '[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline',

  // Lists
  '[&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc',
  '[&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal',
  '[&_li]:mb-2 [&_li]:leading-7',

  // Inline code
  '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:font-mono',

  // Code blocks
  '[&_pre]:my-4 [&_pre]:rounded-lg [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:overflow-x-auto',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm',

  // Blockquotes
  '[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic',

  // Strong/emphasis
  '[&_strong]:font-semibold',

  // Horizontal rules
  '[&_hr]:my-8 [&_hr]:border-border',

  // Tables
  '[&_table]:w-full [&_table]:my-4 [&_table]:border-collapse',
  '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold',
  '[&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2',
);

export function MDXContent({ children, className }: MDXContentProps) {
  return <div className={cn(mdxStyles, className)}>{children}</div>;
}
