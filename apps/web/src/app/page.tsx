'use client';
import { useTheme } from 'next-themes';
import { MoonIcon } from '@phosphor-icons/react';
import { SunIcon } from '@phosphor-icons/react';
import { Button } from '@inset/ui/button';
import { useEffect, useState } from 'react';
import { Combobox, ComboboxInput } from '@inset/ui/combobox';
import { Label } from '@inset/ui/label';

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
      <Combobox items={fruits}>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="select-fruit">Select a fruit</Label>
          <ComboboxInput
            className="w-80"
            id="select-fruit"
            placeholder="e.g. Apple"
            trigger
            hasClear
          />
        </div>
      </Combobox>
    </div>
  );
}

const fruits = [
  'Apple',
  'Banana',
  'Orange',
  'Pineapple',
  'Grape',
  'Mango',
  'Strawberry',
  'Blueberry',
  'Raspberry',
  'Blackberry',
  'Cherry',
  'Peach',
  'Pear',
  'Plum',
  'Kiwi',
  'Watermelon',
  'Cantaloupe',
  'Honeydew',
  'Papaya',
  'Guava',
  'Lychee',
  'Pomegranate',
  'Apricot',
  'Grapefruit',
  'Passionfruit',
];
