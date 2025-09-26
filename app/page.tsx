"use client";

import { useEffect, useState } from "react";
import SimpleButton from "@/components/button/simple-button/button";
import StatefulButton from "@/components/button/stateful-button/button";

export default function Home() {
  const buttonStates = [
    "idle",
    "loading",
    "success",
    "error",
    "warning",
    "disabled",
  ] as const;

  type ButtonState = (typeof buttonStates)[number];

  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % buttonStates.length;
      setButtonState(buttonStates[idx]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold gap-4 ">
      <SimpleButton>Click me</SimpleButton>

      <StatefulButton state={buttonState}>Click me</StatefulButton>
    </div>
  );
}
