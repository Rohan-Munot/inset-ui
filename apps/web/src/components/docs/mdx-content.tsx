import type { ReactNode } from 'react';

interface MDXContentProps {
  children: ReactNode;
}

export function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border max-w-none">
      {children}
    </div>
  );
}
