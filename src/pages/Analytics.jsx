import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Clock,
  Shield,
  FileText,
  User,
  Settings,
  Search,
  Filter,
  Download,
  Calendar,
  Zap,
  LogIn,
  AlertCircle,
} from "lucide-react";

// --- MOCK DATA: USER AUDIT LOGS ---
const AUDIT_LOGS = [
  {
    id: 1,
    action: "Started Vulnerability Scan",
    target: "192.168.1.55",
    type: "security",
    time: "10:42 AM",
    date: "Today",
    icon: Zap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: 2,
    action: "Downloaded Report",
    target: "Scan_Report_#442.pdf",
    type: "report",
    time: "10:15 AM",
    date: "Today",
    icon: Download,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 3,
    action: "Profile Updated",
    target: "Changed Avatar",
    type: "account",
    time: "09:30 AM",
    date: "Today",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    action: "System Login",
    target: "MacBook Pro (Indore, IN)",
    type: "auth",
    time: "09:00 AM",
    date: "Today",
    icon: LogIn,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    id: 5,
    action: "Failed Phishing Scan",
    target: "malicious-link.net",
    type: "alert",
    time: "04:20 PM",
    date: "Yesterday",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: 6,
    action: "API Key Generated",
    target: "Production API",
    type: "system",
    time: "02:10 PM",
    date: "Yesterday",
    icon: Settings,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: 7,
    action: "Started Web Recon",
    target: "example.com",
    type: "security",
    time: "11:00 AM",
    date: "Yesterday",
    icon: GlobeIcon,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: 8,
    action: "Password Changed",
    target: "Security Settings",
    type: "auth",
    time: "09:15 AM",
    date: "Yesterday",
    icon: LockIcon,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
];

function GlobeIcon(props) {
  return <Activity {...props} />;
} // Placeholder
function LockIcon(props) {
  return <Shield {...props} />;
} // Placeholder

// Stats Data
const STATS = [
  { label: "Total Actions", value: "1,240", change: "+12%", icon: Activity },
  { label: "Time Active", value: "42h", change: "+5%", icon: Clock },
  { label: "Scans Run", value: "156", change: "+8%", icon: Zap },
  { label: "Reports Exported", value: "89", change: "+2%", icon: FileText },
];

export default function AnalyticsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              User Activity Log
            </h1>
            <p className="text-slate-500 font-medium">
              Comprehensive audit trail of all actions and events.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm flex items-center gap-2 hover:bg-slate-50">
              <Calendar size={16} /> Date Range
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COL: ACTIVITY FEED --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                {["all", "security", "auth", "report"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
                      filter === f
                        ? "bg-slate-800 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* The Timeline */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8">
              <h3 className="font-bold text-lg text-slate-900 mb-6">
                Recent Activity
              </h3>

              <div className="relative space-y-8">
                {/* Vertical Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>

                {AUDIT_LOGS.filter(
                  (l) => filter === "all" || l.type === filter,
                ).map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative flex items-start gap-4 group"
                  >
                    {/* Icon Bubble */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white shadow-sm transition-colors group-hover:scale-110 ${log.bg} ${log.color}`}
                    >
                      <log.icon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {log.action}
                          </h4>
                          <p className="text-slate-500 text-xs font-medium mt-0.5">
                            Target:{" "}
                            <span className="font-mono text-slate-600">
                              {log.target}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs font-bold text-slate-900">
                            {log.time}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium uppercase">
                            {log.date}
                          </span>
                        </div>
                      </div>
                      {/* Optional: Add details badge */}
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            log.type === "security"
                              ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                              : log.type === "alert"
                                ? "bg-red-50 text-red-600 border-red-100"
                                : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {log.type} Event
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-indigo-600 hover:underline">
                  View Older Logs
                </button>
              </div>
            </div>
          </div>

          {/* --- RIGHT COL: INSIGHTS --- */}
          <div className="space-y-6">
            {/* 1. USAGE DISTRIBUTION */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Tools Usage</h3>
              <div className="space-y-4">
                {[
                  { name: "Web Scanner", val: 65, color: "bg-blue-500" },
                  { name: "Phishing Detect", val: 20, color: "bg-rose-500" },
                  { name: "Network Map", val: 15, color: "bg-emerald-500" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-600">
                      <span>{item.name}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ACTIVITY HEATMAP (Simplified) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">
                Activity Density
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Contribution graph for the last 30 days.
              </p>

              <div className="grid grid-cols-7 gap-1.5">
                {/* Generating 4 weeks of fake data */}
                {Array.from({ length: 28 }).map((_, i) => {
                  // Random opacity to simulate activity
                  const level = Math.random();
                  const colorClass =
                    level > 0.8
                      ? "bg-indigo-600"
                      : level > 0.5
                        ? "bg-indigo-400"
                        : level > 0.2
                          ? "bg-indigo-200"
                          : "bg-slate-100";

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`w-full aspect-square rounded-md ${colorClass}`}
                      title={`Activity Level: ${Math.floor(level * 10)}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-slate-100"></div>
                  <div className="w-3 h-3 rounded bg-indigo-200"></div>
                  <div className="w-3 h-3 rounded bg-indigo-400"></div>
                  <div className="w-3 h-3 rounded bg-indigo-600"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* 3. DEVICE INFO */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <User size={80} />
              </div>
              <h3 className="font-bold text-lg mb-1">Current Session</h3>
              <div className="space-y-3 mt-4 text-sm font-mono text-slate-300">
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>IP Addr:</span>{" "}
                  <span className="text-white">192.168.1.105</span>
                </p>
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Location:</span>{" "}
                  <span className="text-white">Indore, IN</span>
                </p>
                <p className="flex justify-between pb-1">
                  <span>Device:</span>{" "}
                  <span className="text-white">Chrome / Mac OS</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
