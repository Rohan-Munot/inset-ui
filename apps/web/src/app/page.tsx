'use client';
import { useTheme } from 'next-themes';
import { MoonIcon, UserIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';
import { Button } from '@inset/ui/button';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@inset/ui/avatar';

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
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          alt="avatar"
        />
        <AvatarFallback>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
