"use client";
import { ShinyButton } from "@/registry/button/shiny-button/shiny-button";
import { ArrowRightIcon } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-4">
      <ShinyButton>
        Button
        <ArrowRightIcon />
      </ShinyButton>
    </div>
  );
}
