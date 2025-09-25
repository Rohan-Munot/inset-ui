"use client";

import LikeSaveCard from "@/components/card/like-save-card.tsx/like-save-card";
import PinList from "@/components/pin-list/pin-list";
import { cn } from "@/lib/utils";
import { initialTaskList } from "@/lib/pin-list-data";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl bg-accent font-semibold gap-4">
      <LikeSaveCard />
      {/* <div
        className={cn(
          "flex w-full max-w-xl flex-col gap-6 rounded-3xl bg-card p-6 text-card-foreground h-[90%]",
          "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]"
        )}
      >
        <PinList taskList={initialTaskList} />
      </div> */}
    </div>
  );
}
