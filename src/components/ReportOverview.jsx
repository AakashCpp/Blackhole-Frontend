import React from "react";
import { ChevronRight } from "lucide-react";

function ReportOverview({
  title, // url / target name
  subtitle, // optional small info
  stats = [], // array of { label, value }
  tags = [], // ports / vulnerabilities etc
  onExpand, // expand click handler
}) {
  return (
    <div className="w-full rounded-xl bg-white border border-slate-200 p-4 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Title */}
        <div className="relative flex-1 bg-slate-100 rounded-lg px-4 py-2 overflow-hidden">
          <p className="text-sm font-semibold text-slate-700 truncate pr-8">
            {title}
          </p>

          {subtitle && (
            <p className="text-xs text-slate-500 truncate pr-8">{subtitle}</p>
          )}

          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-slate-100 to-transparent" />
        </div>

        {/* Expand */}
        <button
          onClick={onExpand}
          className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-500 transition"
        >
          Expand <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats / Meta bars */}
      {stats.length > 0 && (
        <div className="space-y-2">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {stat.label}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tags / Details */}
      {tags.length > 0 && (
        <div className="bg-slate-100 rounded-lg p-3 flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Details
          </span>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportOverview;
