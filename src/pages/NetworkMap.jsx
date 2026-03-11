import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
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

// CONNECT TO YOUR CYBERSENITELX BACKEND
const socket = io("http://localhost:5000", {
  withCredentials: true,
});

// Top Sources ke UI Colors
const SOURCE_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-slate-400",
  "bg-blue-400",
];

export default function NetworkAnalysisPage() {
  // --- DYNAMIC STATES ---
  const [stats, setStats] = useState({
    totalRequests: "0",
    peakRPS: "0",
    avgLatency: "0ms",
    threatLevel: "Normal",
  });
  const [graphData, setGraphData] = useState(new Array(20).fill(0));
  const [topSources, setTopSources] = useState([]);
  const [logs, setLogs] = useState([]);

  // --- LISTEN TO SOCKET EVENTS ---
  useEffect(() => {
    socket.on("network-metrics", (data) => {
      if (data) {
        setStats(data.stats);
        setGraphData(data.graphData);
        setTopSources(data.topSources);
        setLogs(data.logs);
      }
    });

    return () => socket.off("network-metrics");
  }, []);

  const MAX_VALUE = Math.max(...graphData, 10);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Network Analysis
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 border border-green-200 text-green-700 text-xs font-bold rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Traffic monitoring and DDoS mitigation logs.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 shadow-sm flex items-center gap-2">
              Real-Time (Last 20s)
            </span>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity size={14} /> Total Requests
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.totalRequests}
            </div>
            <div className="text-xs font-medium text-green-600 mt-1">
              Live updates via Socket.IO
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Server size={14} /> Peak Load
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.peakRPS}{" "}
              <span className="text-sm font-medium text-slate-400">RPS</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Globe size={14} /> Avg Latency
            </div>
            <div className="text-3xl font-black text-slate-900">
              {stats.avgLatency}
            </div>
          </div>
          <div
            className={`bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden ${stats.threatLevel === "High" ? "border-2 border-red-400 bg-red-50" : "border border-red-100"}`}
          >
            <div
              className={`absolute right-0 top-0 p-4 opacity-5 ${stats.threatLevel === "High" ? "text-red-600" : "text-red-600"}`}
            >
              <AlertTriangle size={80} />
            </div>
            <div
              className={`${stats.threatLevel === "High" ? "text-red-500" : "text-slate-400"} text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2`}
            >
              <Shield size={14} /> Threat Level
            </div>
            <div
              className={`text-3xl font-black ${stats.threatLevel === "High" ? "text-red-600" : "text-slate-900"}`}
            >
              {stats.threatLevel}
            </div>
            {stats.threatLevel === "High" && (
              <div className="text-xs font-medium text-red-500 mt-1">
                Heavy Load / DDoS Pattern
              </div>
            )}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. TRAFFIC GRAPH */}
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

            <div className="h-64 flex items-end justify-between gap-2 overflow-hidden">
              {graphData.map((val, i) => {
                const heightPercentage = (val / MAX_VALUE) * 100;

                return (
                  <motion.div
                    key={i}
                    initial={{ height: "0%" }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className={`w-full rounded-t-sm relative group ${val > 50 ? "bg-red-400" : "bg-indigo-400"}`}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {val} RPS
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
              <span>Past</span>
              <span>Live (Now)</span>
            </div>
          </div>

          {/* 2. TOP SOURCES */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">
              Top Attack Sources
            </h3>
            <div className="space-y-4">
              {topSources.length === 0 && (
                <div className="text-sm text-slate-400">
                  Waiting for traffic...
                </div>
              )}
              {topSources.map((item, i) => (
                <div key={item.ip || i}>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                    <span>
                      {item.country === "Auto-Detected"
                        ? item.ip
                        : item.country}
                    </span>
                    <span className="text-slate-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${SOURCE_COLORS[i] || "bg-slate-400"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono truncate">
                    IP: {item.ip}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
              Block All Sources
            </button>
          </div>
        </div>

        {/* --- PACKET INSPECTOR TABLE (UPDATED WITH OS, BROWSER, SIZE, LATENCY) --- */}
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
                  <th className="px-6 py-4">Source & Client</th>{" "}
                  {/* Updated Heading */}
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Request Details</th>{" "}
                  {/* Updated Heading */}
                  <th className="px-6 py-4">Status & Latency</th>{" "}
                  {/* Updated Heading */}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      Listening for incoming traffic...
                    </td>
                  </tr>
                )}
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Timestamp */}
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {log.time}
                    </td>

                    {/* Source IP, OS & Browser */}
                    <td className="px-6 py-4">
                      <div className="font-mono font-medium text-slate-700">
                        {log.ip}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                        {log.os} • {log.browser}
                      </div>
                    </td>

                    {/* Country */}
                    <td className="px-6 py-4 text-slate-600">{log.country}</td>

                    {/* Method, Target URL & Payload Size */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase">
                          {log.method}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 truncate max-w-37.5">
                          {log.path || log.targetUrl || "/"}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Payload: {log.sizeBytes} B
                      </div>
                    </td>

                    {/* Status Code & Latency */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {log.status === "Blocked" || log.code >= 400 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                            <Ban size={12} /> Blocked ({log.code})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                            <CheckCircle2 size={12} /> Allowed ({log.code})
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-500">
                          {log.latency}ms
                        </span>
                      </div>
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
