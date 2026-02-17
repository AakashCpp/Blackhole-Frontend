import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-3 gap-6">
        <Stat title="Total Scans" value="2,438" />
        <Stat title="Threats Detected" value="87" />
        <Stat title="Safe Systems" value="96%" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-75 flex items-center justify-center">
        <BarChart3 size={48} className="text-slate-400" />
        <span className="ml-3 text-slate-500">
          Charts integration coming soon
        </span>
      </div>
    </motion.div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
