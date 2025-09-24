"use client";

import LikeSaveCard from "@/components/card/like-save-card.tsx/like-save-card";
import PinList from "@/components/pin-list/pin-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-4">
      {/* <LikeSaveCard /> */}
      <PinList />
    </div>
  );
}
