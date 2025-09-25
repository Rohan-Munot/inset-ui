import { motion, Variants, type MotionProps } from "motion/react";

export const BookmarkIcon = (props: MotionProps) => {
  const { animate } = props;

  const bookmarkVariants = {
    unbookmarked: {
      fill: "none",
      stroke: "currentColor",
      scale: [1, 0.92, 1],
      transition: { duration: 0.2, ease: "easeOut" },
    },
    bookmarked: {
      fill: "currentColor",
      stroke: "currentColor",
      y: [0, -35, 0],
      scale: [1, 1.12, 1],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <motion.path
        animate={animate}
        variants={bookmarkVariants as Variants}
        d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </motion.svg>
  );
};
