import React, { useState, useEffect } from "react";
import axios from "axios";
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

// --- 👉 ICON MAPPING CONFIG ---
// Ye object database ke "type" ko UI ke "icon/color" se map karega
const LOG_CONFIG = {
  security: {
    icon: Zap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  auth: {
    icon: LogIn,
    color: "text-slate-600",
    bg: "bg-slate-100",
    border: "border-slate-200",
  },
  report: {
    icon: Download,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  account: {
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  alert: {
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  system: {
    icon: Settings,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
};

export default function AnalyticsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 👉 NEW STATES FOR DYNAMIC DATA
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [toolUsage, setToolUsage] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // 👉 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/activity/dashboard",
          {
            withCredentials: true, // Cookies (JWT) bhejne ke liye zaroori hai
          },
        );

        const { logs, stats, toolUsage, sessionInfo } = response.data.data;
        setLogs(logs);
        setStats(stats);
        setToolUsage(toolUsage);
        setSessionInfo(sessionInfo);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 👉 FILTER & SEARCH LOGIC
  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filter === "all" || log.type === filter;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">
        Loading CyberSentinel X Dashboard...
      </div>
    );

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
              Comprehensive audit trail of your actions.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* --- STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            // Icon mapping for stats
            const Icon = stat.label.includes("Actions")
              ? Activity
              : stat.label.includes("Active")
                ? Clock
                : stat.label.includes("Scans")
                  ? Zap
                  : FileText;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COL: ACTIVITY FEED --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                {["all", "security", "auth", "report", "account"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${filter === f ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-500"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h3 className="font-bold text-lg text-slate-900 mb-6">
                Recent Activity
              </h3>
              <div className="relative space-y-8">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
                {filteredLogs.map((log, i) => {
                  const config = LOG_CONFIG[log.type] || LOG_CONFIG.system;
                  const IconComp = config.icon;
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative flex items-start gap-4 group"
                    >
                      <div
                        className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${config.bg} ${config.color}`}
                      >
                        <IconComp size={20} />
                      </div>
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
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${config.color} ${config.border}`}
                          >
                            {log.type} Event
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- RIGHT COL: INSIGHTS --- */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Tools Usage</h3>
              <div className="space-y-4">
                {toolUsage.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-600">
                      <span>{item.name}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- DEVICE INFO (DYNAMIC) --- */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <User size={80} />
              </div>
              <h3 className="font-bold text-lg mb-1">Current Session</h3>
              <div className="space-y-3 mt-4 text-sm font-mono text-slate-300">
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>IP Addr:</span>{" "}
                  <span className="text-white">{sessionInfo.ip}</span>
                </p>
                <p className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Location:</span>{" "}
                  <span className="text-white">{sessionInfo.location}</span>
                </p>
                <p className="flex justify-between pb-1">
                  <span>Device:</span>{" "}
                  <span className="text-white">{sessionInfo.device}</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                Online Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
