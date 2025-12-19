"use client";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
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
} from "@inset/ui/autocomplete";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const items = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Grape", value: "grape" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Kiwi", value: "kiwi" },
    { label: "Peach", value: "peach" },
    { label: "Pear", value: "pear" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-foreground">
          Inset UI Autocomplete Examples
        </h1>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200 ease-in-out"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Dropdown Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            2. With Dropdown List
          </h2>
          <p className="text-muted-foreground">
            Autocomplete with a list of selectable items.
          </p>
          <div className="bg-card p-6 rounded-lg border border-border">
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
          </div>
        </section>

        {/* Grouped Example */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            3. Grouped Items
          </h2>
          <p className="text-muted-foreground">
            Items organized into categories with labels.
          </p>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Autocomplete>
              <AutocompleteInput placeholder="Search food..." />
              <AutocompletePopup className="w-full max-w-xs sm:max-w-sm mt-2 bg-card border border-border rounded-lg shadow-lg p-2">
                <AutocompleteList>
                  <AutocompleteGroup>
                    <AutocompleteGroupLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Fruits
                    </AutocompleteGroupLabel>
                    <AutocompleteItem value="apple">🍎 Apple</AutocompleteItem>
                    <AutocompleteItem value="banana">
                      🍌 Banana
                    </AutocompleteItem>
                    <AutocompleteItem value="orange">
                      🍊 Orange
                    </AutocompleteItem>
                  </AutocompleteGroup>

                  <AutocompleteSeparator className="my-2 border-border" />

                  <AutocompleteGroup>
                    <AutocompleteGroupLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Vegetables
                    </AutocompleteGroupLabel>
                    <AutocompleteItem value="carrot">
                      🥕 Carrot
                    </AutocompleteItem>
                    <AutocompleteItem value="broccoli">
                      🥦 Broccoli
                    </AutocompleteItem>
                    <AutocompleteItem value="tomato">
                      🍅 Tomato
                    </AutocompleteItem>
                  </AutocompleteGroup>
                </AutocompleteList>
              </AutocompletePopup>
            </Autocomplete>
          </div>
        </section>

        {/* Custom Styling with Clear */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            4. Custom Styling with Clear Button
          </h2>
          <p className="text-muted-foreground">
            Enhanced styling with a clear button and custom positioning.
          </p>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Autocomplete>
              <div className="relative">
                <AutocompleteInput
                  placeholder="Search technologies..."
                  className="pr-10"
                />
                <AutocompleteClear className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </div>
              <AutocompletePopup className="w-full max-w-xs sm:max-w-sm mt-2 bg-card border border-border rounded-lg shadow-lg p-2">
                <AutocompleteList>
                  <AutocompleteItem value="react">⚛️ React</AutocompleteItem>
                  <AutocompleteItem value="vue">💚 Vue.js</AutocompleteItem>
                  <AutocompleteItem value="angular">
                    🅰️ Angular
                  </AutocompleteItem>
                  <AutocompleteItem value="svelte">🧡 Svelte</AutocompleteItem>
                  <AutocompleteItem value="nextjs">▲ Next.js</AutocompleteItem>
                </AutocompleteList>
              </AutocompletePopup>
            </Autocomplete>
          </div>
        </section>

        {/* Empty State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            5. Empty State
          </h2>
          <p className="text-muted-foreground">
            Shows a message when no items match the search.
          </p>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Autocomplete>
              <AutocompleteInput placeholder="Try typing 'xyz'..." />
              <AutocompletePopup className="w-full max-w-xs sm:max-w-sm mt-2 bg-card border border-border rounded-lg shadow-lg p-2">
                <AutocompleteList>
                  <AutocompleteItem value="javascript">
                    JavaScript
                  </AutocompleteItem>
                  <AutocompleteItem value="typescript">
                    TypeScript
                  </AutocompleteItem>
                  <AutocompleteItem value="python">Python</AutocompleteItem>
                </AutocompleteList>
                <AutocompleteEmpty className="px-2 py-4 text-sm text-muted-foreground text-center">
                  No results found. Try a different search term.
                </AutocompleteEmpty>
              </AutocompletePopup>
            </Autocomplete>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            6. Disabled State
          </h2>
          <p className="text-muted-foreground">
            Shows how the autocomplete looks when disabled.
          </p>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Autocomplete>
              <AutocompleteInput
                placeholder="This autocomplete is disabled"
                disabled
              />
            </Autocomplete>
          </div>
        </section>
      </div>
    </div>
  );
}
