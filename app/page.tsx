"use client";
import { motion } from "motion/react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-4xl font-semibold">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        inset ui
      </motion.div>
    </div>
  );
}
