'use client';

import Link from 'next/link';
import { useDocsContext } from './docs-layout';
import { cn } from '@inset/ui/lib/utils';
import type { ReactNode } from 'react';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface DocsHeaderProps {
  logo?: ReactNode;
  title?: string;
  links?: NavLink[];
  children?: ReactNode;
  className?: string;
}

export function DocsHeader({
  logo,
  title = 'Inset UI',
  links,
  children,
  className,
}: DocsHeaderProps) {
  const { setSidebarOpen } = useDocsContext();

  return (
    <header
      data-slot="docs-header"
      className={cn(
        'border-border bg-background/80 sticky top-0 z-50 border-b border-dashed backdrop-blur-sm',
        className
      )}
    >
      <div className="border-border mx-auto flex h-14 max-w-7xl items-center justify-between border-none px-4 sm:border-x sm:border-dashed md:px-6">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-4">
          <DocsHeaderMobileToggle onClick={() => setSidebarOpen(true)} />
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {logo}
            <span>{title}</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        {links && links.length > 0 && (
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                {...(link.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}

interface DocsHeaderMobileToggleProps {
  onClick: () => void;
  className?: string;
}

function DocsHeaderMobileToggle({ onClick, className }: DocsHeaderMobileToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors md:hidden',
        className
      )}
      aria-label="Open navigation menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
  );
}

interface DocsHeaderSearchTriggerProps {
  onClick?: () => void;
  className?: string;
}

export function DocsHeaderSearchTrigger({ onClick, className }: DocsHeaderSearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors',
        className
      )}
      aria-label="Search documentation"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden sm:inline-block">Search...</span>
      <kbd className="border-border bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}

interface DocsHeaderThemeToggleProps {
  className?: string;
}

export function DocsHeaderThemeToggle({ className }: DocsHeaderThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.toggle('dark');
      }}
      className={cn(
        'text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors',
        className
      )}
      aria-label="Toggle theme"
    >
      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden dark:block"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}
