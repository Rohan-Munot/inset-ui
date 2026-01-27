import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import type { ReactNode } from 'react';

interface HeaderProps {
  leftSlot?: ReactNode;
}

export function Header({ leftSlot }: HeaderProps = {}) {
  return (
    <header className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 w-full border-b border-dashed backdrop-blur-md">
      <div className="border-border container mx-auto flex h-14 items-center gap-2 border-none px-4 sm:border-x sm:border-dashed">
        {leftSlot}
        <div className="bg-border mr-2 block h-[calc(100%-20px)] w-px sm:hidden"></div>
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Logo className="size-5 sm:size-6" />
          <span>Inset UI</span>
        </Link>
        <div className="flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}
