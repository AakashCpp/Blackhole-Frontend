import React from "react";
import { motion } from "framer-motion";

export const IntersectingLinesLoader = () => {
  // Common transition properties for smooth drawing effect
  const drawTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center justify-center p-8">
      {/* Container rotates slowly while lines intersect inside */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        className="overflow-visible drop-shadow-lg"
        animate={{ rotate: 180 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        {/* Center Node (Intersection Point) */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="#cbd5e1" // Slate-300
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 1. Main Horizontal Line */}
        <motion.line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="#94a3b8" // Slate-400
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 0.8, 0],
            pathOffset: [0, 0.2, 1],
            opacity: [0, 1, 0],
          }}
          transition={{ ...drawTransition, delay: 0 }}
        />

        {/* 2. Main Vertical Line */}
        <motion.line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="#94a3b8" // Slate-400
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 0.8, 0],
            pathOffset: [0, 0.2, 1],
            opacity: [0, 1, 0],
          }}
          transition={{ ...drawTransition, delay: 0.5 }} // Offset delay for crossing effect
        />

        {/* 3. Diagonal Line 1 (Top-Left to Bottom-Right) */}
        <motion.line
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          stroke="#64748b" // Slate-500 (Thoda dark)
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 0.6, 0],
            pathOffset: [0, 0.4, 1],
            opacity: [0, 0.8, 0],
          }}
          transition={{ ...drawTransition, delay: 1 }}
        />

        {/* 4. Diagonal Line 2 (Bottom-Left to Top-Right) */}
        <motion.line
          x1="15"
          y1="85"
          x2="85"
          y2="15"
          stroke="#64748b" // Slate-500
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 0.6, 0],
            pathOffset: [0, 0.4, 1],
            opacity: [0, 0.8, 0],
          }}
          transition={{ ...drawTransition, delay: 1.5 }}
        />
      </motion.svg>
    </div>
  );
};

export const StableScannerLoader = () => {
  // Sync all animations for a stable, rhythmic pulse
  const pulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center justify-center p-8">
      {/* Container is now completely stable (No rotation) */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        className="overflow-visible drop-shadow-lg"
      >
        {/* --- STABLE FRAME (Corner Brackets) --- */}
        <g stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Top Left */}
          <path d="M 25 35 L 25 25 L 35 25" />
          {/* Top Right */}
          <path d="M 75 35 L 75 25 L 65 25" />
          {/* Bottom Left */}
          <path d="M 25 65 L 25 75 L 35 75" />
          {/* Bottom Right */}
          <path d="M 75 65 L 75 75 L 65 75" />
        </g>

        {/* --- CENTER CORE --- */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="#cbd5e1" // Slate-300
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={pulseTransition}
        />

        {/* --- RADIATING LINES (Drawing from center to edges) --- */}
        {/* Right Line */}
        <motion.line
          x1="50"
          y1="50"
          x2="85"
          y2="50"
          stroke="#94a3b8" // Slate-400
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={pulseTransition}
        />

        {/* Left Line */}
        <motion.line
          x1="50"
          y1="50"
          x2="15"
          y2="50"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={pulseTransition}
        />

        {/* Bottom Line */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="85"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={pulseTransition}
        />

        {/* Top Line */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={pulseTransition}
        />

        {/* Subtle Outer Pulse Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#64748b" // Slate-500
          strokeWidth="1"
          animate={{ scale: [0.5, 1.8], opacity: [0.8, 0] }}
          transition={{ ...pulseTransition, duration: 2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};
