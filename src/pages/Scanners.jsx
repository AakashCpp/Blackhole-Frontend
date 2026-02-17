import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function Scanners() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Scanners</h1>

      <div className="grid grid-cols-3 gap-6">
        <ScannerCard
          title="Web Vulnerability Scan"
          status="Running"
          color="emerald"
        />
        <ScannerCard title="Network Port Scan" status="Idle" color="amber" />
        <ScannerCard
          title="Malware Detection"
          status="Threat Found"
          color="rose"
          alert
        />
      </div>
    </motion.div>
  );
}

function ScannerCard({ title, status, color, alert }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <ShieldCheck className={`text-${color}-600`} />
        {alert && <AlertTriangle className="text-rose-500" />}
      </div>

      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className={`text-sm text-${color}-600 mt-1`}>{status}</p>
    </div>
  );
}
