'use client';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';
import { cn } from '@inset/ui/lib/utils';
import { Button } from '@inset/ui/button';
import { Input } from '@inset/ui/input';
import { useEffect, useState } from 'react';
import { Label } from '@inset/ui/label';
import { Checkbox } from '@inset/ui/checkbox';

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
      <Button onClick={toggleTheme} className="absolute top-0 right-0 m-4">
        {mounted &&
          (theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />)}
      </Button>
      <div className="mt-3 flex max-w-sm flex-col">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" />
      </div>
      <div className="mt-3 flex max-w-sm items-center gap-2">
        <Checkbox id="checkbox" />
        <Label htmlFor="checkbox">Checkbox</Label>
      </div>
    </div>
  );
}
