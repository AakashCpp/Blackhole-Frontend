import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  CheckCircle,
  Search,
  Save,
  Loader2,
  Server,
  Activity,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
  Lock,
  Terminal,
  Globe,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const PhishingScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [scanLogs, setScanLogs] = useState([]);

  // Table states
  const [history, setHistory] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Staggered Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // 1. FETCH DATABASE RECORDS
  useEffect(() => {
    const fetchDbData = async () => {
      setIsTableLoading(true);

      // =========================================================
      // 🔌 API CALL: FETCH DATABASE RECORDS (UNCOMMENT WHEN BACKEND IS READY)
      // =========================================================
      /*
      try {
        const response = await fetch(`${API_BASE_URL}/scans/history`);
        const data = await response.json();
        
        if (data.status === "success" && data.records) {
          setHistory(data.records);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsTableLoading(false);
      }
      */

      // =========================================================
      // 🧪 DUMMY DATA LOGIC (CURRENTLY ACTIVE)
      // =========================================================
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const dummyData = Array.from({ length: 65 }, (_, i) => ({
        id: i + 1,
        status: "success",
        url: `https://target-domain-${i + 1}.xyz`,
        analysis: {
          prediction: Math.random() > 0.7 ? "phishing" : "legitimate",
          confidence: Math.random() * 0.15 + 0.85,
        },
      }));
      setHistory(dummyData);
      setIsTableLoading(false);
    };
    fetchDbData();
  }, []);

  // 2. SCAN TARGET URL
  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsScanning(true);
    setCurrentResult(null);
    setScanLogs([]);

    // Terminal Logs Animation
    const logs = [
      "Initiating connection to target...",
      "Extracting DOM layout & headers...",
      "Running BERT-Base-Uncased NLP...",
      "Calculating threat vectors...",
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setScanLogs((prev) => [...prev, log]);
      }, index * 500);
    });

    // =========================================================
    // 🔌 API CALL: SCAN TARGET URL (UNCOMMENT WHEN BACKEND IS READY)
    // =========================================================
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setCurrentResult(data);
      } else {
        setScanLogs((prev) => [...prev, "ERROR: Scan failed. Check target URL."]);
      }
    } catch (error) {
      console.error("API Error during scan:", error);
      setScanLogs((prev) => [...prev, "ERROR: Backend connection refused."]);
    } finally {
      setIsScanning(false);
    }
    */

    // =========================================================
    // 🧪 DUMMY SCAN LOGIC (CURRENTLY ACTIVE)
    // =========================================================
    setTimeout(() => {
      setIsScanning(false);
      const isPhished = Math.random() > 0.5;

      setCurrentResult({
        status: "success",
        url: url,
        analysis: {
          prediction: isPhished ? "phishing" : "legitimate",
          confidence: isPhished
            ? Math.random() * 0.2 + 0.8
            : Math.random() * 0.05 + 0.95,
          engine: "BERT-Base-Uncased",
        },
      });
    }, 2500);
  };

  // 3. SAVE RESULT TO DB
  const handleSaveToDb = async () => {
    if (!currentResult) return;

    // =========================================================
    // 🔌 API CALL: SAVE RESULT TO DB (UNCOMMENT WHEN BACKEND IS READY)
    // =========================================================
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/scans/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentResult),
      });
      const data = await response.json();

      if (data.status === "success") {
        setHistory([{ ...currentResult, id: data.id || Date.now() }, ...history]);
        setCurrentResult(null);
        setUrl("");
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Failed to save record:", error);
    }
    */

    // =========================================================
    // 🧪 DUMMY SAVE LOGIC (CURRENTLY ACTIVE)
    // =========================================================
    setHistory([{ ...currentResult, id: Date.now() }, ...history]);
    setCurrentResult(null);
    setUrl("");
    setCurrentPage(1);
  };

  const formatConfidence = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans selection:bg-white/30 overflow-hidden relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-350 mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-10"
        >
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent">
              Intelligence Node
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-white/50 text-xs font-mono">
                STATUS: SECURE | ENGINE: ACTIVE
              </p>
            </div>
          </div>
        </motion.div>

        {/* 50-50 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT COLUMN: Enhanced Scanner & Result */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              {[
                { icon: Cpu, label: "Engine", val: "4-Layered" },
                { icon: Zap, label: "Latency", val: "42ms" },
                { icon: Lock, label: "Protocol", val: "A.I. Active" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                >
                  <metric.icon className="w-4 h-4 text-white/50" />
                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                      {metric.label}
                    </div>
                    <div className="font-mono text-sm font-semibold">
                      {metric.val}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={handleScan}
              className="relative z-20"
            >
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${isScanning ? "bg-blue-500/30" : "bg-white/5 group-hover:bg-white/10"}`}
                ></div>
                <div
                  className={`relative flex items-center bg-black/60 border rounded-2xl p-2 backdrop-blur-xl transition-all ${isScanning ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]" : "border-white/10 focus-within:border-white/30"}`}
                >
                  <Search
                    className={`w-6 h-6 ml-4 transition-colors ${isScanning ? "text-blue-400" : "text-white/40"}`}
                  />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter target URL for deep scan..."
                    required
                    disabled={isScanning}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 px-4 py-3 font-mono text-sm disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isScanning}
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:bg-white/10 disabled:text-white"
                  >
                    {isScanning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                    {isScanning ? "Scanning..." : "Initialize"}
                  </motion.button>
                </div>
              </div>
            </motion.form>

            <AnimatePresence mode="wait">
              {!isScanning && !currentResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
                >
                  <Activity className="w-10 h-10 text-white/20 mb-4 animate-pulse" />
                  <p className="text-white/40 font-mono text-sm tracking-wide">
                    SYSTEM IDLE // AWAITING TARGET
                  </p>
                </motion.div>
              )}

              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/80 border border-white/10 rounded-2xl p-5 font-mono text-xs text-green-400/80 overflow-hidden backdrop-blur-md shadow-inner"
                >
                  <div className="flex items-center gap-2 mb-4 text-white/50 border-b border-white/10 pb-3">
                    <Terminal className="w-4 h-4" /> Live Analysis Terminal
                  </div>
                  <div className="space-y-2">
                    {scanLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <span className="text-blue-400 mr-2">
                          [{new Date().toLocaleTimeString()}]
                        </span>
                        {log}
                      </motion.div>
                    ))}
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="inline-block w-2 h-3 bg-green-400/80 mt-2"
                    />
                  </div>
                </motion.div>
              )}

              {currentResult &&
                currentResult.status === "success" &&
                !isScanning && (
                  <motion.div
                    key="result-card"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/5 border border-white/20 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl overflow-hidden relative"
                  >
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-20 pointer-events-none ${currentResult.analysis.prediction === "legitimate" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <div className="relative z-10 flex items-start gap-5">
                      <div
                        className={`p-4 rounded-2xl bg-white/5 border ${currentResult.analysis.prediction === "legitimate" ? "border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]" : "border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"}`}
                      >
                        {currentResult.analysis.prediction === "legitimate" ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <ShieldAlert className="w-8 h-8" />
                        )}
                      </div>
                      <div className="flex-1 w-full pt-1">
                        <h3 className="text-xl font-bold tracking-tight mb-1">
                          {currentResult.analysis.prediction === "legitimate"
                            ? "Legitimate Target"
                            : "Phishing Threat Detected"}
                        </h3>
                        <p className="text-white/50 text-xs font-mono mb-6 truncate max-w-75">
                          {currentResult.url}
                        </p>
                        <div className="space-y-2 mb-6 bg-black/40 p-4 rounded-xl border border-white/5">
                          <div className="flex justify-between items-end">
                            <span className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1">
                              <Activity className="w-3 h-3" /> Confidence Score
                            </span>
                            <span className="font-mono text-sm font-semibold">
                              {formatConfidence(
                                currentResult.analysis.confidence,
                              )}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${currentResult.analysis.confidence * 100}%`,
                              }}
                              transition={{
                                duration: 1.2,
                                delay: 0.2,
                                ease: "easeOut",
                              }}
                              className={`h-full rounded-full ${currentResult.analysis.prediction === "legitimate" ? "bg-green-400" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"}`}
                            />
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-[10px] text-white/30 font-mono">
                              ENGINE: {currentResult.analysis.engine}
                            </p>
                            <p className="text-[10px] text-white/30 font-mono">
                              STATUS: SUCCESS
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSaveToDb}
                            className="flex items-center gap-2 bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-xl transition-all text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          >
                            <Save className="w-4 h-4" /> Commit to Database
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Paginated History Table */}
          <motion.div variants={itemVariants} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-white/50" />
                <h2 className="text-xl font-semibold tracking-tight">
                  Database Records
                </h2>
              </div>
              {!isTableLoading && history.length > 0 && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1 backdrop-blur-sm shadow-inner">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-1.5 hover:bg-white/10 rounded-md disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-white/60 min-w-10 text-center">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-1.5 hover:bg-white/10 rounded-md disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex-1 relative min-h-125 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              {isTableLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p className="text-sm font-mono tracking-wide">
                    Syncing records...
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto h-full max-h-150 custom-scrollbar">
                  <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/10">
                      <tr className="text-[10px] uppercase tracking-widest text-white/40">
                        <th className="p-5 font-medium">Target URL</th>
                        <th className="p-5 font-medium">Conf.</th>
                        <th className="p-5 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <AnimatePresence mode="popLayout">
                        {currentItems.map((item, i) => (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="hover:bg-white/5 transition-colors group"
                          >
                            <td className="p-5 font-mono text-sm break-all max-w-50 text-white/70 truncate group-hover:text-white/90 transition-colors">
                              {item.url}
                            </td>
                            <td className="p-5 font-mono text-sm text-white/50 group-hover:text-white/70 transition-colors">
                              {formatConfidence(item.analysis.confidence)}
                            </td>
                            <td className="p-5 text-right">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${item.analysis.prediction === "legitimate" ? "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]" : "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"}`}
                              >
                                {item.analysis.prediction.toUpperCase()}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhishingScanner;
