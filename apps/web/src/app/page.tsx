'use client';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import {
  Autocomplete,
  AutocompleteInput,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteClear,
  AutocompleteSeparator,
  AutocompleteTrigger,
} from '@inset/ui/autocomplete';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Mango', value: 'mango' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Peach', value: 'peach' },
    { label: 'Pear', value: 'pear' },
  ];

  return (
    <div className="bg-background min-h-screen p-8">
      {/* Header with theme toggle */}
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-foreground text-3xl font-bold">Inset UI Autocomplete Examples</h1>
        <button
          onClick={toggleTheme}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-ring inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
        </button>
      </div>

      <div className="mx-auto max-w-4xl space-y-12">
        {/* Dropdown Example */}
        <section className="space-y-4">
          <h2 className="text-foreground text-xl font-semibold">2. With Dropdown List</h2>
          <p className="text-muted-foreground">Autocomplete with a list of selectable items.</p>

          <Autocomplete items={items}>
            <AutocompleteInput placeholder="Choose a fruit..." />
            <AutocompletePopup>
              <AutocompleteEmpty>No items found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item) => (
                  <AutocompleteItem key={item.value} value={item}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
        </section>

        {/* Grouped Example */}
        <section className="space-y-4">
          <h2 className="text-foreground text-xl font-semibold">3. Grouped Items</h2>
          <p className="text-muted-foreground">Items organized into categories with labels.</p>

          <Autocomplete>
            <AutocompleteInput placeholder="Search food..." />
            <AutocompletePopup className="bg-card border-border mt-2 w-full max-w-xs rounded-lg border p-2 shadow-lg sm:max-w-sm">
              <AutocompleteList>
                <AutocompleteGroup>
                  <AutocompleteGroupLabel className="text-muted-foreground px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                    Fruits
                  </AutocompleteGroupLabel>
                  <AutocompleteItem value="apple">🍎 Apple</AutocompleteItem>
                  <AutocompleteItem value="banana">🍌 Banana</AutocompleteItem>
                  <AutocompleteItem value="orange">🍊 Orange</AutocompleteItem>
                </AutocompleteGroup>

                <AutocompleteSeparator className="border-border my-2" />

                <AutocompleteGroup>
                  <AutocompleteGroupLabel className="text-muted-foreground px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                    Vegetables
                  </AutocompleteGroupLabel>
                  <AutocompleteItem value="carrot">🥕 Carrot</AutocompleteItem>
                  <AutocompleteItem value="broccoli">🥦 Broccoli</AutocompleteItem>
                  <AutocompleteItem value="tomato">🍅 Tomato</AutocompleteItem>
                </AutocompleteGroup>
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
        </section>

        {/* Custom Styling with Clear */}
        <section className="space-y-4">
          <h2 className="text-foreground text-xl font-semibold">
            4. Custom Styling with Clear Button
          </h2>
          <p className="text-muted-foreground">
            Enhanced styling with a clear button and custom positioning.
          </p>

          <Autocomplete>
            <div className="relative">
              <AutocompleteInput placeholder="Search technologies..." className="pr-10" />
              <AutocompleteClear className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transition-colors" />
            </div>
            <AutocompletePopup className="bg-card border-border mt-2 w-full max-w-xs rounded-lg border p-2 shadow-lg sm:max-w-sm">
              <AutocompleteList>
                <AutocompleteItem value="react">⚛️ React</AutocompleteItem>
                <AutocompleteItem value="vue">💚 Vue.js</AutocompleteItem>
                <AutocompleteItem value="angular">🅰️ Angular</AutocompleteItem>
                <AutocompleteItem value="svelte">🧡 Svelte</AutocompleteItem>
                <AutocompleteItem value="nextjs">▲ Next.js</AutocompleteItem>
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
        </section>

        {/* Empty State */}
        <section className="space-y-4">
          <h2 className="text-foreground text-xl font-semibold">5. Empty State</h2>
          <p className="text-muted-foreground">Shows a message when no items match the search.</p>

          <Autocomplete>
            <AutocompleteInput placeholder="Try typing 'xyz'..." />
            <AutocompletePopup className="bg-card border-border mt-2 w-full max-w-xs rounded-lg border p-2 shadow-lg sm:max-w-sm">
              <AutocompleteList>
                <AutocompleteItem value="javascript">JavaScript</AutocompleteItem>
                <AutocompleteItem value="typescript">TypeScript</AutocompleteItem>
                <AutocompleteItem value="python">Python</AutocompleteItem>
              </AutocompleteList>
              <AutocompleteEmpty className="text-muted-foreground px-2 py-4 text-center text-sm">
                No results found. Try a different search term.
              </AutocompleteEmpty>
            </AutocompletePopup>
          </Autocomplete>
        </section>

        {/* Disabled State */}
        <section className="space-y-4">
          <h2 className="text-foreground text-xl font-semibold">6. Disabled State</h2>
          <p className="text-muted-foreground">Shows how the autocomplete looks when disabled.</p>

          <Autocomplete>
            <AutocompleteInput placeholder="This autocomplete is disabled" disabled />
          </Autocomplete>
        </section>
      </div>
    </div>
  );
}
