import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Globe,
  Search,
  Zap,
  Server,
  AlertTriangle,
  Play,
  Terminal,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  Bug,
  Link,
  FileText,
} from "lucide-react";

// --- TOOLS CONFIGURATION ---
const TOOLS = [
  {
    id: "web-scan",
    title: "Web Scanner",
    description:
      "General reconnaissance. Analyzes site structure, technologies, and HTTP headers.",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
    glow: "shadow-blue-200",
  },
  {
    id: "vuln-scan",
    title: "Vulnerability Scanner",
    description:
      "Deep offensive scan. Tests for SQLi, XSS, CVEs, and server misconfigurations.",
    icon: Bug, // Changed to Bug icon for Vuln
    color: "text-violet-600",
    bg: "bg-violet-50",
    glow: "shadow-violet-200",
  },
  {
    id: "phishing-detect",
    title: "Phishing Detection",
    description:
      "Hybrid analysis. Detects malicious URLs and analyzes email content for fraud.",
    icon: Mail,
    color: "text-rose-600",
    bg: "bg-rose-50",
    glow: "shadow-rose-200",
  },
];

// --- FAKE TERMINAL LOGS ---
const LOG_STEPS = {
  "web-scan": [
    "> Initializing Spider (Crawler)...",
    "> GET /robots.txt [FOUND]",
    "> Detecting CMS and Frameworks...",
    "> Analyzing HTTP Security Headers...",
    "> Mapping Sitemap structure...",
    "> Web Reconnaissance Complete.",
  ],
  "vuln-scan": [
    "> Loading Exploit Database (CVE-2024)...",
    "> Fuzzing input parameters...",
    "> Testing payload: ' OR 1=1 --",
    "> Checking Reflected XSS...",
    "> Scanning for Open Redirects...",
    "> ALERT: Potential vulnerability found at /admin",
    "> Report Generation Started.",
  ],
  "phishing-url": [
    "> Resolving Domain DNS...",
    "> Checking WHOIS creation date...",
    "> Analyzing SSL Certificate Authority...",
    "> Cross-referencing PhishTank Database...",
    "> Heuristic Analysis: Suspicious Patterns...",
    "> VERDICT: POTENTIALLY UNSAFE",
  ],
  "phishing-email": [
    "> Parsing Email Headers (DKIM/SPF)...",
    "> Analyzing Sender Reputation...",
    "> Extracting embedded links...",
    "> NLP Sentiment Analysis: URGENCY DETECTED",
    "> Checking for homograph attacks...",
    "> VERDICT: HIGH RISK SCAM",
  ],
};

export default function ScannersPage() {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [inputValue, setInputValue] = useState("");
  const [scanStatus, setScanStatus] = useState("idle"); // idle, scanning, complete
  const [logs, setLogs] = useState([]);

  // Specific State for Phishing Tool (URL vs Email)
  const [phishingMode, setPhishingMode] = useState("url"); // 'url' or 'email'

  // Handle Scan Logic
  const handleStartScan = () => {
    if (!inputValue) return;
    setScanStatus("scanning");
    setLogs([]);

    // Determine which logs to use
    let logKey = activeTool.id;
    if (activeTool.id === "phishing-detect") {
      logKey = phishingMode === "url" ? "phishing-url" : "phishing-email";
    }

    const currentLogs = LOG_STEPS[logKey];
    let i = 0;

    const interval = setInterval(() => {
      setLogs((prev) => [...prev, currentLogs[i]]);
      i++;
      if (i >= currentLogs.length) {
        clearInterval(interval);
        setScanStatus("complete");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-slate-800 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- 1. TOOL SELECTOR GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS.map((tool) => {
            const isActive = activeTool.id === tool.id;
            return (
              <motion.div
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool);
                  setScanStatus("idle");
                  setLogs([]);
                  setInputValue("");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? `bg-white border-indigo-600 shadow-xl ${tool.glow}`
                    : "bg-white border-transparent hover:border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute top-4 right-4 w-3 h-3 bg-indigo-600 rounded-full"
                  />
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${tool.bg} ${tool.color}`}
                >
                  <tool.icon size={24} />
                </div>
                <h3
                  className={`font-bold text-lg mb-1 ${isActive ? "text-slate-900" : "text-slate-700"}`}
                >
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">
                  {tool.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* --- 2. ACTIVE TOOL WORKSPACE --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
          >
            {/* Toolbar Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${activeTool.bg} ${activeTool.color}`}
                >
                  <activeTool.icon size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {activeTool.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Module Active
                  </div>
                </div>
              </div>

              {/* PHISHING MODE TOGGLE (Only shows if Phishing Tool is active) */}
              {activeTool.id === "phishing-detect" && (
                <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                  <button
                    onClick={() => {
                      setPhishingMode("url");
                      setInputValue("");
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${phishingMode === "url" ? "bg-rose-50 text-rose-600" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    <Link size={16} /> Check URL
                  </button>
                  <button
                    onClick={() => {
                      setPhishingMode("email");
                      setInputValue("");
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${phishingMode === "email" ? "bg-rose-50 text-rose-600" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    <FileText size={16} /> Analyze Email
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* --- LEFT: INPUT FORM --- */}
              <div className="lg:col-span-2 p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                    {activeTool.id === "phishing-detect" &&
                    phishingMode === "email"
                      ? "Paste Email Content / Headers"
                      : "Target Input"}
                  </label>

                  <div className="relative group">
                    {activeTool.id === "phishing-detect" &&
                    phishingMode === "email" ? (
                      /* Text Area for Email Phishing */
                      <textarea
                        rows={6}
                        placeholder="Paste the suspicious email body or raw headers here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={scanStatus === "scanning"}
                        className="w-full bg-slate-50 p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white outline-none transition-all font-mono text-sm text-slate-800 disabled:opacity-50 resize-none"
                      />
                    ) : (
                      /* Standard Input for URL/Web */
                      <div className="relative">
                        <Search
                          className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder={
                            activeTool.id === "web-scan"
                              ? "https://example.com"
                              : activeTool.id === "vuln-scan"
                                ? "IP Address or Domain"
                                : "https://suspicious-link.net"
                          }
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={scanStatus === "scanning"}
                          className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800 disabled:opacity-50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Configuration Toggles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Zap size={18} />
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      Deep Analysis
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Lock size={18} />
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      Private Report
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleStartScan}
                  disabled={!inputValue || scanStatus === "scanning"}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                    scanStatus === "scanning"
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-1"
                  }`}
                >
                  {scanStatus === "scanning" ? (
                    <>
                      {" "}
                      <Loader2 className="animate-spin" /> Scanning
                      Target...{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Play size={20} fill="currentColor" /> Run{" "}
                      {activeTool.title}{" "}
                    </>
                  )}
                </button>
              </div>

              {/* --- RIGHT: LIVE CONSOLE --- */}
              <div className="bg-slate-900 p-6 lg:border-l border-slate-100 text-slate-300 font-mono text-xs md:text-sm flex flex-col h-100 lg:h-auto overflow-hidden relative">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
                  <span className="flex items-center gap-2 font-bold text-slate-100">
                    <Terminal size={14} /> SYSTEM_TERMINAL
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                </div>

                {/* Log Output */}
                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {logs.length === 0 && scanStatus === "idle" && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                      <Terminal size={40} className="mb-2" />
                      <p>Ready for input...</p>
                    </div>
                  )}

                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400 break-all"
                    >
                      <span className="text-slate-500 mr-2">
                        [
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                        ]
                      </span>
                      {log}
                    </motion.div>
                  ))}

                  {scanStatus === "complete" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} /> Scan Completed. Report
                      Available.
                    </motion.div>
                  )}
                </div>

                {/* Cursor */}
                {scanStatus === "scanning" && (
                  <div className="mt-2 w-2 h-4 bg-green-500 animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
