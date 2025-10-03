"use client";

import { useMemo, useState } from "react";
import { Pin, PinOff } from "lucide-react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import CheckboxLabel from "@/components/checkbox-label/checkbox-label";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TaskOwner = {
  name: string;
  initials: string;
  role?: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  stage: string;
  due: string;
  pinned: boolean;
  owner?: TaskOwner;
};

type TaskList = {
  id: string;
  title: string;
  summary: string;
  tasks: Task[];
};

const PinList = ({ taskList }: { taskList: TaskList }) => {
  const [taskListState, setTaskListState] = useState<TaskList>(taskList);

  const { orderedList } = useMemo(() => {
    const pinned: Task[] = [];
    const others: Task[] = [];
    for (const task of taskListState.tasks) {
      (task.pinned ? pinned : others).push(task);
    }
    return { orderedList: [...pinned, ...others] };
  }, [taskListState.tasks]);

  const handlePinToggle = (taskId: string) => {
    setTaskListState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, pinned: !task.pinned } : task
      ),
    }));
  };

  return (
    <LayoutGroup id={`${taskList.id}-group`}>
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-2 [scrollbar-width:none]">
        {orderedList.map((task) => {
          const isPinned = task.pinned;
          return (
            // complete card component
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { duration: 0.3 },
              }}
              className={cn(
                "group relative flex flex-col gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4 transition-colors duration-200",
                "hover:bg-muted/40",
                "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)]",
                isPinned && "border-primary/50 bg-primary/5 shadow-xs"
              )}
            >
              {/* Header of the card */}
              <div className="flex items-center justify-between gap-3">
                <CheckboxLabel
                  id={`${taskList.id}-${task.id}`}
                  text={task.title}
                  variants="strike"
                  className="text-sm font-medium text-foreground"
                />

                <motion.button
                  type="button"
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border border-transparent bg-background",
                    "hover:bg-muted hover:scale-105 active:scale-95 focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-primary ",
                    "opacity-0 group-hover:opacity-100",
                    isPinned && "opacity-100"
                  )}
                  aria-pressed={isPinned}
                  aria-label={isPinned ? "Unpin task" : "Pin task"}
                  title={isPinned ? "Unpin task" : "Pin task"}
                  onClick={() => handlePinToggle(task.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPinned ? (
                    <PinOff className="size-4 text-primary" />
                  ) : (
                    <Pin className="size-4 text-muted-foreground transition group-hover:text-primary" />
                  )}
                </motion.button>
              </div>

              <p className="pl-8 text-sm text-muted-foreground">
                {task.description}
              </p>
              {/* footer of pinlist card */}
              <div className="ml-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <Badge variant="outline" className="rounded-full">
                  {task.stage}
                </Badge>
                <span>{task.due}</span>
                {task.owner && (
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-[0.65rem] font-semibold text-foreground/80">
                      {task.owner.initials}
                    </span>
                    <span className="text-xs font-medium text-foreground/80">
                      {task.owner.name}
                    </span>
                  </span>
                )}
              </div>
              {/* Pinned badge top left */}
              <AnimatePresence>
                {isPinned && (
                  <motion.span
                    key="pinned-badge"
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.8,
                      backdropFilter: "blur(0px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      backdropFilter: "blur(10px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      scale: 0.8,
                      backdropFilter: "blur(0px)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute -top-2 left-4 inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary shadow-[0_6px_20px_rgba(53,64,82,0.18)] z-20"
                  >
                    Pinned
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
};
export default PinList;
