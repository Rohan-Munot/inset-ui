// app/components/PinList.tsx
"use client";

import { useState, useMemo } from "react";
import { Pin, PinOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 1. Define the structure for each item
type ListItem = {
  id: number;
  title: string;
  description: string;
  isPinned?: boolean;
  pinnedAt?: number | null; // Timestamp for sorting pinned items
};

// 2. Initial mock data for the list
const initialItems: ListItem[] = [
  {
    id: 1,
    title: "Review Q3 Report",
    description: "Finance team's quarterly results.",
  },
  {
    id: 2,
    title: "Plan Team Offsite",
    description: "Coordinate with logistics for the event.",
  },
  {
    id: 3,
    title: "Fix Login Bug",
    description: "Critical issue reported on the main app.",
  },
  {
    id: 4,
    title: "Draft Marketing Copy",
    description: "New campaign launch next week.",
  },
  {
    id: 5,
    title: "Onboard New Hire",
    description: "Prepare welcome package and docs.",
  },
];

export default function PinList() {
  const [items, setItems] = useState<ListItem[]>(initialItems);

  // 3. Handle the pinning and unpinning logic
  const handlePinToggle = (itemId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === itemId) {
          const isNowPinned = !item.isPinned;
          return {
            ...item,
            isPinned: isNowPinned,
            pinnedAt: isNowPinned ? Date.now() : null, // Set timestamp only when pinning
          };
        }
        return item;
      })
    );
  };

  // 4. Sort the items for rendering without changing the original state order directly
  const sortedItems = useMemo(() => {
    const itemsCopy = [...items];
    return itemsCopy.sort((a, b) => {
      // Pinned items always come before unpinned items
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // If both are pinned, sort by the most recent timestamp
      if (a.isPinned && b.isPinned) {
        return (b.pinnedAt ?? 0) - (a.pinnedAt ?? 0);
      }

      // If both are unpinned, maintain original order (by ID)
      return a.id - b.id;
    });
  }, [items]);

  // Find the index of the last pinned item to render a separator
  const lastPinnedIndex = sortedItems.findLastIndex((item) => item.isPinned);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Project Tasks</CardTitle>
        <CardDescription>
          Click the pin to move tasks to the top.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedItems.map((item, index) => (
            <>
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-lg"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePinToggle(item.id)}
                  aria-label={item.isPinned ? "Unpin item" : "Pin item"}
                >
                  {item.isPinned ? (
                    <Pin className="size-5 text-blue-500 fill-blue-500" />
                  ) : (
                    <PinOff className="size-5 text-muted-foreground" />
                  )}
                </Button>
              </li>
              {/* Render a visual separator after the last pinned item */}
              {index === lastPinnedIndex && lastPinnedIndex !== -1 && (
                <div className="relative text-center my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <span className="relative bg-background px-2 text-xs uppercase text-muted-foreground">
                    Unpinned
                  </span>
                </div>
              )}
            </>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
