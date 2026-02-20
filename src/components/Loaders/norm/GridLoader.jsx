import React from "react";
import { motion } from "framer-motion";

export default function GridLoader() {
  // Hum 3x3 ka grid bana rahe hain, toh total 9 items chahiye
  const dots = Array.from({ length: 9 });

  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-2">
        {dots.map((_, i) => {
          // Grid ke har item ki row aur column nikal rahe hain
          // Taaki hum ek "wave" (lehar) jaisa delay effect de sakein
          const row = Math.floor(i / 3);
          const col = i % 3;

          // Diagonal wave effect ke liye delay calculation
          const delay = (row + col) * 0.15;

          return (
            <motion.div
              key={i}
              className="w-4 h-4 bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(234,88,12,0.8)]"
              animate={{
                scale: [0.3, 1, 0.3],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
