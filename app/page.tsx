"use client";

import LikeSaveCard from "@/components/card/like-save-card.tsx/like-save-card";
import PinList from "@/components/pin-list/pin-list";

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
      <PinList taskList={initialTaskList} />
    </div>
  );
}
