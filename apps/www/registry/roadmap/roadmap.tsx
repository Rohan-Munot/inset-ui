"use client";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";

interface RoadmapStepCardProps {
  title: string;
  text_1: string;
  text_2: string;
  card_contents: React.ReactNode;
  position: "top" | "bottom";
  className?: string;
  layoutId: string;
  onClick: () => void;
}

const RoadmapStepCard: React.FC<RoadmapStepCardProps> = ({
  title,
  text_1,
  text_2,
  card_contents,
  position,
  className = "",
  layoutId,
  onClick,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateZ = useTransform(x, [-100, 100], [-12, 12]);
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
      layoutId={layoutId}
      className={`-ml-6 md:-ml-9 absolute flex flex-col w-36 cursor-pointer md:w-44 rounded-xl border border-neutral-400 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(48,48,55,0.05),0_2px_3px_rgba(0,0,0,0.05)] ${className}`}
      onMouseMove={handleMouse}
      onClick={onClick}
      style={{
        [position]: "115px",
        x: translateX,
        rotateZ: rotateZ,
      }}
    >
      <div className="flex flex-col h-full justify-between rounded-xl ">
        <div className="flex flex-col justify-between items-start text-center bg-background p-3 rounded-t-xl space-y-0.5">
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

interface ExpandedCardProps {
  title: string;
  text_1: string;
  text_2: string;
  card_contents: React.ReactNode;
  layoutId: string;
  onClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({
  title,
  text_1,
  text_2,
  card_contents,
  layoutId,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        className="relative w-full max-w-lg mx-4 bg-background rounded-xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full rounded-xl">
          <div className="flex flex-col justify-between items-start p-4 rounded-t-xl space-y-2">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-bold leading-tight">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex items-center w-full justify-between">
              <p className="text-sm leading-tight">{text_1}</p>
              <p className="text-sm leading-tight text-muted-foreground">
                {text_2}
              </p>
            </div>
          </div>

          <div className="p-4 pt-0">{card_contents}</div>
        </div>
      </motion.div>
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleCloseExpanded = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <div className="space-x-1 flex items-center">
        {roadmapSteps.map((step, index) => (
          <div key={index} className="relative flex items-center py-16 w-full">
            {selectedCard !== index && (
              <RoadmapStepCard
                position={index % 2 === 0 ? "bottom" : "top"}
                title={step.title}
                text_1={step.text_1}
                text_2={step.text_2}
                card_contents={step.card_contents}
                layoutId={`card-${index}`}
                onClick={() => handleCardClick(index)}
              />
            )}
            <Check className="size-8 p-1.5 rounded-full relative bg-muted aspect-square flex-shrink-0" />
            {index < roadmapSteps.length - 1 && (
              <div className="-mr-1 h-0.5 w-14 duration-300 sm:hidden md:block md:w-24 lg:w-28 xl:w-44 bg-neutral-200"></div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <ExpandedCard
            title={roadmapSteps[selectedCard].title}
            text_1={roadmapSteps[selectedCard].text_1}
            text_2={roadmapSteps[selectedCard].text_2}
            card_contents={roadmapSteps[selectedCard].card_contents}
            layoutId={`card-${selectedCard}`}
            onClose={handleCloseExpanded}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Roadmap;
