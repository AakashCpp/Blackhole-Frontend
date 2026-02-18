import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Shield,
  AlertTriangle,
  Globe,
  Server,
  Ban,
  CheckCircle2,
  Search,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

// --- STATIC DATA ---
const TRAFFIC_STATS = {
  totalRequests: "2.4M",
  peakRPS: "4,200",
  avgLatency: "45ms",
  threatLevel: "High",
};

// Data containing spikes (values > 100 represent heavy load relative to baseline)
const GRAPH_DATA = [
  20, 25, 22, 28, 35, 40, 38, 45, 100, 120, 140, 135, 90, 60, 40, 30, 25, 22,
  20, 18,
];

// FIX: Find the maximum value to normalize the graph height (so 140 becomes 100%)
const MAX_VALUE = Math.max(...GRAPH_DATA);

const LOGS = [
  {
    id: 1,
    time: "14:32:05",
    ip: "192.168.1.105",
    country: "United States",
    method: "POST",
    status: "Blocked",
    code: 403,
  },
  {
    id: 2,
    time: "14:32:04",
    ip: "45.33.22.11",
    country: "Russia",
    method: "SYN",
    status: "Blocked",
    code: 429,
  },
  {
    id: 3,
    time: "14:32:02",
    ip: "103.21.244.0",
    country: "China",
    method: "GET",
    status: "Blocked",
    code: 403,
  },
  {
    id: 4,
    time: "14:32:01",
    ip: "10.0.0.55",
    country: "Internal",
    method: "GET",
    status: "Allowed",
    code: 200,
  },
  {
    id: 5,
    time: "14:31:59",
    ip: "185.220.101.4",
    country: "Germany",
    method: "POST",
    status: "Blocked",
    code: 403,
  },
  {
    id: 6,
    time: "14:31:55",
    ip: "198.51.100.23",
    country: "Brazil",
    method: "GET",
    status: "Allowed",
    code: 200,
  },
  {
    id: 7,
    time: "14:31:50",
    ip: "172.16.0.4",
    country: "Internal",
    method: "HEAD",
    status: "Allowed",
    code: 200,
  },
  {
    id: 8,
    time: "14:31:48",
    ip: "103.21.244.2",
    country: "China",
    method: "SYN",
    status: "Blocked",
    code: 429,
  },
];

export default function NetworkAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Network Analysis
            </h1>
            <p className="text-slate-500 font-medium">
              Traffic monitoring and DDoS mitigation logs.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 shadow-sm flex items-center gap-2">
              Last 24 Hours
            </span>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity size={14} /> Total Requests
            </div>
            <div className="text-3xl font-black text-slate-900">
              {TRAFFIC_STATS.totalRequests}
            </div>
            <div className="text-xs font-medium text-green-600 mt-1">
              +12% vs last hour
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Server size={14} /> Peak Load
            </div>
            <div className="text-3xl font-black text-slate-900">
              {TRAFFIC_STATS.peakRPS}{" "}
              <span className="text-sm font-medium text-slate-400">RPS</span>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Globe size={14} /> Latency
            </div>
            <div className="text-3xl font-black text-slate-900">
              {TRAFFIC_STATS.avgLatency}
            </div>
          </div>
          {/* Card 4 (Threat) */}
          <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-red-600">
              <AlertTriangle size={80} />
            </div>
            <div className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield size={14} /> Threat Level
            </div>
            <div className="text-3xl font-black text-red-600">
              {TRAFFIC_STATS.threatLevel}
            </div>
            <div className="text-xs font-medium text-red-500 mt-1">
              DDoS Pattern Detected
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. TRAFFIC GRAPH (Fixed Overflow) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 text-lg">
                Traffic Volume History
              </h3>
              <div className="flex gap-2 text-xs font-bold">
                <span className="flex items-center gap-1 text-slate-500">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>{" "}
                  Legitimate
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div> Attack
                </span>
              </div>
            </div>

            {/* Graph Container - Added overflow-hidden just in case */}
            <div className="h-64 flex items-end justify-between gap-2 overflow-hidden">
              {GRAPH_DATA.map((val, i) => {
                // FIX: Calculate percentage based on MAX_VALUE
                const heightPercentage = (val / MAX_VALUE) * 100;

                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }} // Using normalized height
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`w-full rounded-t-sm relative group ${val > 80 ? "bg-red-400" : "bg-indigo-100"}`}
                  >
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {val} RPS
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
              <span>14:00</span>
              <span>14:15</span>
              <span>14:30</span>
            </div>
          </div>

          {/* 2. TOP SOURCES (Static List) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">
              Top Attack Sources
            </h3>
            <div className="space-y-4">
              {[
                {
                  country: "China",
                  ip: "103.21.244.0/24",
                  count: "145k",
                  percent: 85,
                  color: "bg-red-500",
                },
                {
                  country: "Russia",
                  ip: "45.33.22.0/24",
                  count: "82k",
                  percent: 60,
                  color: "bg-orange-500",
                },
                {
                  country: "Unknown (Proxy)",
                  ip: "185.220.101.0",
                  count: "40k",
                  percent: 30,
                  color: "bg-slate-400",
                },
                {
                  country: "United States",
                  ip: "192.168.1.0/24",
                  count: "12k",
                  percent: 10,
                  color: "bg-blue-400",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                    <span>{item.country}</span>
                    <span className="text-slate-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Targeting: /api/v1/auth
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
              Block All Sources
            </button>
          </div>
        </div>

        {/* --- PACKET INSPECTOR TABLE --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">
              Detailed Packet Inspector
            </h3>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Search size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Filter size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Source IP</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LOGS.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {log.time}
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-700">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{log.country}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-600">
                        {log.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {log.status === "Blocked" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                          <Ban size={12} /> Blocked ({log.code})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                          <CheckCircle2 size={12} /> Allowed ({log.code})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors">
            View All Logs
          </div>
        </div>
      </div>
    </div>
  );
}
