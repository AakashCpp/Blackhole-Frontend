import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function RollingEyesWithBlink() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const lastMoveRef = useRef(Date.now());

  /* ---------------- Mouse Tracking ---------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      lastMoveRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ---------------- Idle Blink Logic ---------------- */
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const idleTime = Date.now() - lastMoveRef.current;

      if (idleTime > 2000 && !isBlinking) {
        setIsBlinking(true);

        setTimeout(() => {
          setIsBlinking(false);
        }, 180); // blink duration
      }
    }, 2500); // blink check frequency

    return () => clearInterval(blinkInterval);
  }, [isBlinking]);

  /* ---------------- Pupil Roll Math ---------------- */
  const getPupilPos = (eyeRef) => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    const rect = eyeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouse.x - cx;
    const dy = mouse.y - cy;

    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    const eyeRadius = rect.width / 2;
    const pupilRadius = 10 / 2; // h-10 w-10
    const maxRadius = eyeRadius - pupilRadius;

    // 👇 THIS IS THE KEY LINE
    const clampedDistance = Math.min(distance, maxRadius);

    return {
      x: (dx / distance) * clampedDistance,
      y: (dy / distance) * clampedDistance,
    };
  };

  const left = getPupilPos(leftEyeRef);
  const right = getPupilPos(rightEyeRef);

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full h-40 flex items-center justify-center gap-6">
      {/* LEFT EYE */}
      <motion.div
        ref={leftEyeRef}
        className="h-30 w-30 bg-white rounded-full flex items-center justify-center overflow-hidden"
        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <motion.div
          className="h-10 w-10 bg-black rounded-full"
          animate={{ x: left.x, y: left.y }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        />
      </motion.div>

      {/* RIGHT EYE */}
      <motion.div
        ref={rightEyeRef}
        className="h-30 w-30 bg-white rounded-full flex items-center justify-center overflow-hidden"
        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <motion.div
          className="h-10 w-10 bg-black rounded-full"
          animate={{ x: right.x, y: right.y }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        />
      </motion.div>
    </div>
  );
}
