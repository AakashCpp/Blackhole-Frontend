import { motion } from "framer-motion";
import { User, Mail, Shield } from "lucide-react";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold">
            SKY
          </div>

          <div>
            <h2 className="font-semibold text-lg">Admin SKY</h2>
            <p className="text-sm text-slate-500">Security Administrator</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <Info icon={Mail} label="Email" value="admin@skysec.io" />
          <Info icon={Shield} label="Role" value="Super Admin" />
          <Info icon={User} label="Status" value="Active" />
        </div>
      </div>
    </motion.div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-100">
      <Icon size={18} className="text-slate-500" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
