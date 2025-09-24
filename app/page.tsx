"use client";
import CheckboxLabel from "@/components/checkbox-label/checkbox-label";
import { CheckboxComponent } from "@/components/checkbox/01_checkbox";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-4">
      <div className="w-max flex flex-col gap-4">
        <CheckboxComponent />
        <CheckboxLabel id="terms" text="Strike Through" variants="strike" />
        <CheckboxLabel id="listen" text="Listen to GYBE" />
      </div>
    </div>
  );
}
