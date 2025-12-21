'use client';
import { Input } from '@inset/ui/input';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';

const Page = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute top-0 right-0 m-4">
        <button
          onClick={toggleTheme}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-ring inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <Input />
      </div>
    </div>
  );
};

export default Page;
