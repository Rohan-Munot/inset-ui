import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 w-full border-b border-dashed backdrop-blur-md">
      <div className="border-border container mx-auto flex h-14 items-center justify-between border-x border-dashed px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Logo className="h-6 w-6" />
          <span>Inset UI</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
