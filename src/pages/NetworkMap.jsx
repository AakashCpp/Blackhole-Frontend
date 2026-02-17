import { motion } from "framer-motion";
import { Network } from "lucide-react";

export default function NetworkMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Network Map</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-100 flex flex-col items-center justify-center">
        <Network size={48} className="text-cyan-500 mb-4" />
        <p className="text-slate-500 text-sm">
          Live network topology will render here
        </p>
      </div>
    </motion.div>
  );
}
