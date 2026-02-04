import type * as React from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@inset/ui/lib/utils';
import { CopyButton } from '@/components/copy-button';

interface CodeSnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  language?: string;
}

async function CodeSnippet({ children, className, language = 'tsx', ...props }: CodeSnippetProps) {
  const value = typeof children === 'string' ? children.trim() : '';

  const html = await codeToHtml(value, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });

  return (
    <figure
      className={cn(
        'not-prose group border-border bg-card relative overflow-hidden rounded-xl border',
        className
      )}
      {...props}
    >
      {value ? <CopyButton value={value} /> : null}
      <div
        className="[&_code]:font-mono [&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:p-4 [&>pre]:text-sm [&>pre]:leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}

export { CodeSnippet };
