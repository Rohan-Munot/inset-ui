"use client";
import { Check, Rocket, Target, Zap, Settings, Trophy } from "lucide-react";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

// Roadmap Step Card Component
interface RoadmapStepCardProps {
  title: string;
  description: string;
  card_contents: React.ReactNode;
  position: "top" | "bottom";
  className?: string;
}

const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  title,
  description,
  card_contents,
  position,
  className = "",
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateZ = useTransform(x, [-100, 100], [-10, 10]);
  const translateX = useTransform(x, [-100, 100], [-30, 30]);
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
      className={`-ml-6 md:-ml-9 absolute flex flex-col w-36 cursor-pointer md:w-44   rounded-xl border border-border ${className}`}
      onMouseMove={handleMouse}
      style={{
        [position]: "115px",
        x: translateX,
        rotateZ: rotateZ,
      }}
    >
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="flex flex-col justify-between items-center text-center space-y-2">
          <h3 className="text-sm md:text-base font-bold leading-tight">
            {title}
          </h3>
          <p className="text-xs leading-tight opacity-80">{description}</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="rounded-lg p-2 border border-border text-sm">
            {card_contents}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
interface roadmapProps {
  roadmapSteps: Array<{
    title: string;
    description: string;
    card_contents: React.ReactNode;
  }>;
}

const Roadmap = ({ roadmapSteps }: roadmapProps) => {
  return (
    <div className="space-x-1 flex items-center">
      {roadmapSteps.map((step, index) => (
        <div key={index} className="relative flex items-center py-16 w-36">
          <RoadmapStepCard
            position={index % 2 === 0 ? "bottom" : "top"}
            title={step.title}
            description={step.description}
            card_contents={step.card_contents}
          />
          <Check className="size-10 p-1.5 rounded-full relative bg-muted aspect-square flex-shrink-0" />
          {index < roadmapSteps.length - 1 && (
            <div className="-mr-1 h-0.5 w-12 transition-colors duration-300 sm:hidden md:block md:w-24 lg:w-28 xl:w-36 bg-border"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
