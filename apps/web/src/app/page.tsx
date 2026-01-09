'use client';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';
import { Button } from '@inset/ui/button';
import { Badge } from '@inset/ui/badge';
export default function Particle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Button onClick={toggleTheme} className="absolute top-0 right-0 m-4">
        {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
      </Button>
      <Badge variant="default">Badge</Badge>
      <Badge variant="destructive-outline">Badge</Badge>
      <Badge variant="error">Badge</Badge>
      <Badge variant="secondary">Badge</Badge>
      <Badge variant="success">Badge</Badge>
      <Badge variant="warning">Badge</Badge>
    </div>
  );
}
