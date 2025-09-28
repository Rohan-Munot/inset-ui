"use client";
import { Check, Rocket, Target, Zap, Settings, Trophy } from "lucide-react";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

// Roadmap Step Card Component
interface RoadmapStepCardProps {
  title: string;
  text_1: string;
  text_2: string;
  card_contents: React.ReactNode;
  position: "top" | "bottom";
  className?: string;
}

const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  title,
  text_1,
  text_2,
  card_contents,
  position,
  className = "",
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateZ = useTransform(x, [-100, 100], [-8, 8]);
  const translateX = useTransform(x, [-100, 100], [-15, 15]);
  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    animate(x, event.clientX - centerX, {
      type: "spring",
      damping: 13,
    });
    animate(y, event.clientY - centerY, {
      type: "spring",
      damping: 20,
    });
  }

  return (
    <motion.div
      className={`-ml-6 md:-ml-9 absolute flex flex-col w-36 cursor-pointer md:w-44 rounded-xl border border-neutral-400 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)] ${className}`}
      onMouseMove={handleMouse}
      style={{
        [position]: "115px",
        x: translateX,
        rotateZ: rotateZ,
      }}
    >
      <div className="flex flex-col h-full justify-between rounded-xl ">
        <div className="flex flex-col justify-between items-start text-center p-3 rounded-t-xl space-y-0.5">
          <h3 className="text-sm md:text-base font-bold leading-tight">
            {title}
          </h3>
          <div className="flex items-center w-full justify-between">
            <p className="text-xs leading-tight whitespace-nowrap">{text_1}</p>
            <p className="text-xs leading-tight text-muted-foreground whitespace-nowrap">
              {text_2}
            </p>
          </div>
        </div>

        {card_contents}
      </div>
    </motion.div>
  );
};
interface roadmapProps {
  roadmapSteps: Array<{
    title: string;
    text_1: string;
    text_2: string;
    card_contents: React.ReactNode;
  }>;
}

const Roadmap = ({ roadmapSteps }: roadmapProps) => {
  return (
    <div className="space-x-1 flex items-center">
      {roadmapSteps.map((step, index) => (
        <div key={index} className="relative flex items-center py-16 w-full">
          <RoadmapStepCard
            position={index % 2 === 0 ? "bottom" : "top"}
            title={step.title}
            text_1={step.text_1}
            text_2={step.text_2}
            card_contents={step.card_contents}
          />
          <Check className="size-8 p-1.5 rounded-full relative bg-muted aspect-square flex-shrink-0" />
          {index < roadmapSteps.length - 1 && (
            <div className="-mr-1 h-0.5 w-14 duration-300 sm:hidden md:block md:w-24 lg:w-28 xl:w-44 bg-neutral-200"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
