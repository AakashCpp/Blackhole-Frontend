import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Server,
  Play,
  Loader2,
  CheckCircle,
  Tag,
  Eye,
  ShieldCheck,
  Plus,
} from "lucide-react";

export default function ScannersPage() {
  // --- FORM STATES MATCHING BACKEND req.body ---
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("web"); // 'web' or 'vuln'
  const [accessibility, setAccessibility] = useState("private"); // 'public' or 'private'

  // --- UI STATES ---
  const [scanStatus, setScanStatus] = useState("idle"); // 'idle', 'scanning', 'success'

  const handleStartScan = async (e) => {
    e.preventDefault();
    if (!target || !title) return;

    setScanStatus("scanning");

    // 1. PREPARE PAYLOAD FOR BACKEND
    const payload = {
      title,
      target,
      type: scanType,
      accessibility,
    };

    console.log("🚀 Payload ready to send:", payload);

    // =========================================================
    // TODO: REDUX / API CALL HERE
    // =========================================================
    /*
    try {
      const res = await fetch('/api/scan/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(data.success) {
         setScanStatus("success");
      }
    } catch (error) {
       console.error(error);
       setScanStatus("idle"); // reset on error
    }
    */

    // 2. SIMULATE API DELAY
    setTimeout(() => {
      setScanStatus("success");
    }, 2500); // 2.5 seconds loading simulation
  };

  const resetForm = () => {
    setTitle("");
    setTarget("");
    setScanType("web");
    setAccessibility("private");
    setScanStatus("idle");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-6 md:p-10 relative flex items-center justify-center overflow-hidden">
      {/* --- BACKGROUND GLASS BLER/BLOBS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header Text */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm mb-4"
          >
            <ShieldCheck className="text-indigo-600 w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Launch New Scan
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Configure target parameters for deep vulnerability and
            reconnaissance scanning.
          </p>
        </div>

        {/* --- MAIN GLASSMORPHISM CARD --- */}
        <motion.div
          layout
          className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {/* STATE 1: IDLE / FORM */}
            {scanStatus === "idle" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10"
              >
                <form onSubmit={handleStartScan} className="space-y-6">
                  {/* Title & Target */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                        <Tag size={14} /> Scan Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Prod Server Weekly Scan"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white/50 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                        <Search size={14} /> Target URL / IP
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="https://example.com or 192.168.1.1"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full bg-white/50 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Dropdowns Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                        <Server size={14} /> Scan Type
                      </label>
                      <div className="relative">
                        <select
                          value={scanType}
                          onChange={(e) => setScanType(e.target.value)}
                          className="w-full bg-white/50 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800 cursor-pointer appearance-none"
                        >
                          <option value="web">Web Reconnaissance</option>
                          <option value="vuln">Vulnerability Scan</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                        <Eye size={14} /> Accessibility
                      </label>
                      <div className="relative">
                        <select
                          value={accessibility}
                          onChange={(e) => setAccessibility(e.target.value)}
                          className="w-full bg-white/50 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800 cursor-pointer appearance-none"
                        >
                          <option value="private">Private (Team Only)</option>
                          <option value="public">Public (Shared)</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!target || !title}
                      className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      <Play size={20} fill="currentColor" /> Initialize Scan
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STATE 2: SCANNING (LOADER) */}
            {scanStatus === "scanning" && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-16 flex flex-col items-center justify-center min-h-100"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <Loader2 className="w-16 h-16 text-indigo-600 animate-spin relative z-10" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-slate-800">
                  Analyzing Target...
                </h3>
                <p className="text-slate-500 font-medium mt-2">
                  Connecting to {target}
                </p>
                <div className="mt-6 flex gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </motion.div>
            )}

            {/* STATE 3: SUCCESS POPUP */}
            {scanStatus === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="p-12 flex flex-col items-center text-center min-h-100 justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Scan Initiated Successfully!
                </h3>
                <p className="text-slate-500 font-medium mb-8 max-w-md">
                  Your scan for{" "}
                  <span className="text-slate-800 font-bold">{target}</span> has
                  been queued. The results will be available in the dashboard
                  shortly.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full max-w-sm mb-8 flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500 uppercase tracking-wider text-xs">
                    Type
                  </span>
                  <span className="text-indigo-600">
                    {scanType === "web" ? "Web Recon" : "Vuln Scan"}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 uppercase tracking-wider text-xs">
                    Access
                  </span>
                  <span className="text-slate-800 capitalize">
                    {accessibility}
                  </span>
                </div>

                <button
                  onClick={resetForm}
                  className="py-3 px-8 rounded-xl font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus size={18} /> New Scan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
