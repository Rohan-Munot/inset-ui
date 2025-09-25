"use client";

import LikeSaveCard from "@/components/card/like-save-card.tsx/like-save-card";
import PinList from "@/components/pin-list/pin-list";
import { cn } from "@/lib/utils";

const initialTaskList = {
  id: "product-experiments",
  title: "Product Experiments",
  summary: "Shortlist the experiments that need quick access for standups.",
  tasks: [
    {
      id: "task-1",
      title: "Revamp onboarding milestones",
      description:
        "Audit the current onboarding flow, highlight friction, and define key success milestones.",
      stage: "In progress",
      due: "Due in 2 days",
      pinned: true,
      owner: {
        name: "Mia Wallace",
        initials: "MW",
        role: "Product Design",
      },
    },
    {
      id: "task-2",
      title: "Instrument activation dashboards",
      description:
        "Pair with data to baseline existing activation metrics and prototype the new dashboard layout.",
      stage: "Review",
      due: "Review tomorrow",
      pinned: false,
      owner: {
        name: "James Carter",
        initials: "JC",
        role: "Analytics",
      },
    },
    {
      id: "task-3",
      title: "Experiment brief: power user invites",
      description:
        "Outline hypotheses and guardrails for the invite flow experiment. Identify required instrumentation.",
      stage: "Backlog",
      due: "Needs grooming",
      pinned: true,
      owner: {
        name: "Priya Desai",
        initials: "PD",
        role: "Product",
      },
    },
    {
      id: "task-4",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
      owner: {
        name: "Leo Ortega",
        initials: "LO",
        role: "Research",
      },
    },
    {
      id: "task-5",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
    {
      id: "task-6",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
    {
      id: "task-7",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
    {
      id: "task-8",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
    {
      id: "task-9",
      title: "Customer loops synthesis",
      description:
        "Sum up qualitative signals from last week's interviews and pull the themes into the experiment backlog.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl bg-accent font-semibold gap-4">
      {/* <LikeSaveCard /> */}
      <div
        className={cn(
          "flex w-full max-w-xl flex-col gap-6 rounded-3xl bg-card p-6 text-card-foreground h-[90%]",
          "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]"
        )}
      >
        <PinList taskList={initialTaskList} />
      </div>
    </div>
  );
}
