import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GithubHeatmap365() {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  const startDate = new Date(today.getTime() - 364 * MS_PER_DAY);

  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cute + soft teal palette (UI friendly)
  const levels = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-teal-400",
    "bg-teal-600",
    "bg-teal-800",
  ];

  // Fake static data
  const days = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(startDate.getTime() + i * MS_PER_DAY);
    return {
      date,
      level: Math.floor(Math.random() * 5),
      scans: Math.floor(Math.random() * 40),
    };
  });

  // Group by weeks
  const weeks = [];
  let week = [];

  days.forEach((day, i) => {
    if (i === 0) {
      for (let j = 0; j < day.date.getDay(); j++) week.push(null);
    }
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  // Month labels
  const monthLabels = {};
  days.forEach((d, i) => {
    if (d.date.getDate() === 1) {
      monthLabels[Math.floor(i / 7)] = d.date.toLocaleString("default", {
        month: "short",
      });
    }
  });

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 text-xs mt-6">
      <div className="mb-3 text-sm font-semibold text-slate-800">
        Scan Activity (Last 365 Days)
      </div>

      {/* Month labels */}
      <div className="ml-8 mb-1 grid grid-flow-col gap-1 text-slate-500">
        {weeks.map((_, i) => (
          <span key={i} className="w-3 text-center">
            {monthLabels[i] || ""}
          </span>
        ))}
      </div>

      <div className="relative flex">
        {/* Day labels */}
        <div className="mr-2 flex flex-col justify-between text-slate-500">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
            <span key={i} className="h-3">
              {i % 2 === 1 ? d : ""}
            </span>
          ))}
        </div>

        {/* Heatmap */}
        <div className="grid grid-flow-col gap-1 flex-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) =>
                day ? (
                  <motion.div
                    key={di}
                    initial={{ scale: 0 }}
                    animate={{ scale: mounted ? 1 : 0 }}
                    transition={{ delay: wi * 0.01, type: "spring" }}
                    onMouseEnter={(e) =>
                      setTooltip({
                        x: e.clientX,
                        y: e.clientY,
                        day,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                    className={`h-3 w-3 rounded-sm cursor-pointer
                      ${levels[day.level]}
                      hover:ring-2 hover:ring-teal-400`}
                  />
                ) : (
                  <div key={di} className="h-3 w-3" />
                ),
              )}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                left: tooltip.x - 80,
                top: tooltip.y - 70,
              }}
              className="fixed z-50 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-xl"
            >
              <div className="font-semibold text-teal-300">
                {tooltip.day.scans} scans
              </div>
              <div className="text-slate-300">
                {tooltip.day.date.toDateString()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-1 text-slate-500">
        <span>Less</span>
        {levels.map((c, i) => (
          <span key={i} className={`h-3 w-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
