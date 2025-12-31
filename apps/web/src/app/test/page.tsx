'use client';
import React from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxValue,
  ComboboxCollection,
} from '@inset/ui/combobox';
import { Label } from '@inset/ui/label';

// Simple string items for basic examples
const fruits = [
  'Apple',
  'Banana',
  'Blueberry',
  'Cherry',
  'Grape',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Pear',
  'Plum',
  'Strawberry',
];

// Grouped data structure for grouped combobox
interface ProduceItem {
  id: string;
  label: string;
  group: 'Berries' | 'Citrus';
}

interface ProduceGroup {
  value: string;
  items: ProduceItem[];
}

const produceData: ProduceItem[] = [
  { id: 'berry-blueberry', label: 'Blueberry', group: 'Berries' },
  { id: 'berry-strawberry', label: 'Strawberry', group: 'Berries' },
  { id: 'berry-raspberry', label: 'Raspberry', group: 'Berries' },
  { id: 'berry-blackberry', label: 'Blackberry', group: 'Berries' },
  { id: 'citrus-lemon', label: 'Lemon', group: 'Citrus' },
  { id: 'citrus-lime', label: 'Lime', group: 'Citrus' },
  { id: 'citrus-orange', label: 'Orange', group: 'Citrus' },
  { id: 'citrus-grapefruit', label: 'Grapefruit', group: 'Citrus' },
];

function groupProduce(items: ProduceItem[]): ProduceGroup[] {
  const groups: Record<string, ProduceItem[]> = {};
  items.forEach((item) => {
    (groups[item.group] ??= []).push(item);
  });
  const order = ['Berries', 'Citrus'];
  return order.map((value) => ({ value, items: groups[value] ?? [] }));
}

const groupedProduce: ProduceGroup[] = groupProduce(produceData);

export default function TestPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-start gap-16 p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Combobox Test Suite</h1>
        <p className="text-muted-foreground max-w-lg">
          Testing various configurations of the Inset UI Combobox component, including
          single/multi-select, icons, grouping, and empty states. State is handled internally by
          Base UI.
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* 1. Basic Single Select (Uncontrolled) */}
        <section className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">1. Basic Single Select</h2>
            <p className="text-muted-foreground text-sm">Standard uncontrolled selection.</p>
          </div>
          <Combobox items={fruits} defaultValue="">
            <div className="flex flex-col gap-2">
              <Label>Select a fruit</Label>
              <ComboboxInput placeholder="Type to search..." className="w-full" />
            </div>
            <ComboboxPopup>
              <ComboboxList>
                {(fruit: string) => (
                  <ComboboxItem key={fruit} value={fruit}>
                    {fruit}
                  </ComboboxItem>
                )}
              </ComboboxList>
              <ComboboxEmpty>No fruits found</ComboboxEmpty>
            </ComboboxPopup>
            <p className="text-muted-foreground mt-2 text-xs">
              Current selection: <ComboboxValue>{(v) => v || 'None'}</ComboboxValue>
            </p>
          </Combobox>
        </section>

        {/* 2. With Trigger and Clear Icons */}
        <section className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">2. With Trigger & Clear</h2>
            <p className="text-muted-foreground text-sm">
              Includes dropdown arrow and clear button.
            </p>
          </div>
          <Combobox items={fruits}>
            <div className="flex flex-col gap-2">
              <Label>Select with icons</Label>
              <ComboboxInput
                trigger
                hasClear
                placeholder="Click chevron or type..."
                className="w-full"
              />
            </div>
            <ComboboxPopup>
              <ComboboxList>
                {(fruit: string) => (
                  <ComboboxItem key={fruit} value={fruit}>
                    {fruit}
                  </ComboboxItem>
                )}
              </ComboboxList>
              <ComboboxEmpty>No fruits found</ComboboxEmpty>
            </ComboboxPopup>
          </Combobox>
        </section>

        {/* 3. Multi-select with Chips (Uncontrolled) */}
        <section className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">3. Multi-select</h2>
            <p className="text-muted-foreground text-sm">
              Removable tags handled via internal state.
            </p>
          </div>
          <Combobox multiple items={fruits} defaultValue={['Apple', 'Banana']}>
            <div className="flex flex-col gap-2">
              <Label>Choose multiple fruits</Label>
              <ComboboxChips className="gap-1.5 border-none bg-transparent p-0 shadow-none">
                <ComboboxValue>
                  {(value: string[]) => (
                    <React.Fragment>
                      {value.map((fruit) => (
                        <ComboboxChip key={fruit}>{fruit}</ComboboxChip>
                      ))}
                      <ComboboxInput
                        placeholder={value.length === 0 ? 'Select fruits...' : 'Add more...'}
                      />
                    </React.Fragment>
                  )}
                </ComboboxValue>
              </ComboboxChips>
            </div>
            <ComboboxPopup>
              <ComboboxList>
                {(fruit: string) => (
                  <ComboboxItem key={fruit} value={fruit}>
                    {fruit}
                  </ComboboxItem>
                )}
              </ComboboxList>
              <ComboboxEmpty>No fruits found</ComboboxEmpty>
            </ComboboxPopup>
          </Combobox>
        </section>

        {/* 4. Grouped Items with Filtering */}
        <section className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">4. Grouped with Filtering</h2>
            <p className="text-muted-foreground text-sm">
              Items organized by category with dynamic filtering.
            </p>
          </div>
          <Combobox items={groupedProduce}>
            <div className="flex flex-col gap-2">
              <Label>Select produce</Label>
              <ComboboxInput
                trigger
                hasClear
                placeholder="Search berries or citrus..."
                className="w-full"
              />
            </div>
            <ComboboxPopup>
              <ComboboxList>
                {(group: ProduceGroup) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                    <ComboboxCollection>
                      {(item: ProduceItem) => (
                        <ComboboxItem key={item.id} value={item}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxGroup>
                )}
              </ComboboxList>
              <ComboboxEmpty>No items found</ComboboxEmpty>
            </ComboboxPopup>
          </Combobox>
        </section>

        {/* 5. Empty State Demo */}
        <section className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">5. Empty State</h2>
            <p className="text-muted-foreground text-sm">Testing the empty results indicator.</p>
          </div>
          <Combobox items={[]}>
            <div className="flex flex-col gap-2">
              <Label>Search empty list</Label>
              <ComboboxInput placeholder="Nothing to find here..." className="w-full" />
            </div>
            <ComboboxPopup>
              <ComboboxList>{() => null}</ComboboxList>
              <ComboboxEmpty className="p-4 text-center">
                <span className="text-muted-foreground italic">
                  No results found for your search.
                </span>
              </ComboboxEmpty>
            </ComboboxPopup>
          </Combobox>
        </section>
      </div>
    </div>
  );
}
