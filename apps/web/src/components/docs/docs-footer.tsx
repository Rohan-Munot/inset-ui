import Link from 'next/link';
import { cn } from '@inset/ui/lib/utils';

interface FooterItem {
  name: React.ReactNode;
  url: string;
}

interface DocsFooterProps {
  previous?: FooterItem;
  next?: FooterItem;
  className?: string;
}

export function DocsFooter({ previous, next, className }: DocsFooterProps) {
  if (!previous && !next) return null;

  return (
    <footer
      className={cn(
        'border-border bg-background fixed right-0 bottom-0 left-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-dashed px-4 py-4 md:static',
        className
      )}
      data-slot="docs-footer"
    >
      {previous ? (
        <Link
          href={previous.url}
          className="group flex flex-col items-start gap-1 rounded-lg p-2 transition-colors"
        >
          <span className="text-foreground group-hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors">
            <ChevronLeftIcon className="size-4" />
            {previous.name}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.url}
          className="group flex flex-col items-end gap-1 rounded-lg p-2 transition-colors"
        >
          <span className="text-foreground group-hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors">
            {next.name}
            <ChevronRightIcon className="size-4" />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </footer>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
