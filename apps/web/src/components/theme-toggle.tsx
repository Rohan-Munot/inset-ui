'use client';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(newTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    await transition.ready;

    // Simple horizontal wipe with spring overshoot
    document.documentElement.animate(
      {
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  // Prevent hydration mismatch by rendering null until mounted
  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="[&_svg]:text-foreground cursor-pointer items-start rounded-md p-1 [&_svg]:size-4.5"
      >
        <IconSun className="opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="[&_svg]:text-foreground cursor-pointer items-start rounded-md p-1 [&_svg]:size-4.5"
    >
      {resolvedTheme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  );
}
