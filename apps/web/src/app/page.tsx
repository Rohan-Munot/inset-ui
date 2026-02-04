'use client';
import { useTheme } from 'next-themes';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from '@inset/ui/button';
import { Badge } from '@inset/ui/badge';
export default function Particle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Button>Button</Button>
      <Badge variant="default">Badge</Badge>
      <Badge variant="destructive-outline">Badge</Badge>
      <Badge variant="error">Badge</Badge>
      <Badge variant="secondary">Badge</Badge>
      <Badge variant="success">Badge</Badge>
      <Badge variant="warning">Badge</Badge>
    </div>
  );
}
