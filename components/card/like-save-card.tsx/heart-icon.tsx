import { motion, Variants, type MotionProps } from "motion/react";

export const HeartIcon = (props: MotionProps) => {
  const { animate } = props;
  const heartVariants = {
    unliked: {
      fill: "none",
      stroke: "currentColor",
      scale: [1, 0.92, 1],
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    liked: {
      fill: "#ff6360",
      stroke: "#ff6360",
      scale: [1, 1.08, 1],
      rotate: [0, -10, 10, -10, 10, 0],
      x: 0,
      transition: {
        fill: {
          duration: 0,
        },
        stroke: {
          duration: 0,
        },
        duration: 0.4,
        ease: "linear",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    },
  };

  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <motion.path
        animate={animate}
        variants={heartVariants as Variants}
        d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </motion.svg>
  );
};
