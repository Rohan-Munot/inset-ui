'use client';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';
import { cn } from '@inset/ui/lib/utils';
import { Button } from '@inset/ui/button';
import { Input } from '@inset/ui/input';
import { useEffect, useState } from 'react';

export default function Particle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <button onClick={toggleTheme} className="absolute top-0 right-0 m-4">
        {mounted &&
          (theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />)}
      </button>
      <Button>
        Default <MoonIcon className="" />
      </Button>
      <Button variant="outline">
        Outline <MoonIcon className="" />
      </Button>
      <Button variant="destructive">
        Destructive <MoonIcon className="" />
      </Button>
      <Button variant="ghost">
        Ghost <MoonIcon className="" />
      </Button>
      <Button variant="destructive-outline">
        Destructive Outline <MoonIcon className="" />
      </Button>
      <div className="flex max-w-sm flex-col gap-2">
        <Input placeholder="Enter your email" />
      </div>
    </div>
  );
}
