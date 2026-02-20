import React from "react";
import { motion } from "framer-motion";

export default function CircularLoader() {
  return (
    <div className="flex items-center justify-center p-8">
      {/* Main SVG Container - rotates the entire loader continuously */}
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="overflow-visible drop-shadow-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          {/* Custom Orange Gradient for the futuristic look */}
          <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" /> {/* Orange-600 */}
            <stop offset="50%" stopColor="#f97316" /> {/* Orange-500 */}
            <stop offset="100%" stopColor="#fcd34d" /> {/* Yellow-300 */}
          </linearGradient>

          {/* Glow filter for the neon effect */}
          <filter id="glow-loader">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 2. Main Stretching Glowing Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="url(#orange-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow-loader)"
          initial={{ strokeDasharray: "10 200", strokeDashoffset: 0 }}
          animate={{
            strokeDasharray: ["10 200", "120 200", "10 200"], // Expands and contracts the stroke
            strokeDashoffset: [0, -60, -210], // Pushes the stroke forward around the circle
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 3. Inner Pulsing Core */}
        <motion.circle
          cx="50"
          cy="50"
          r="10"
          fill="#ea580c"
          filter="url(#glow-loader)"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "50px", originY: "50px" }}
        />
      </motion.svg>
    </div>
  );
}
