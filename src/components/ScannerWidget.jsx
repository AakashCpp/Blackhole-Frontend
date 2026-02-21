import React, { useState, useEffect } from "react";
import {
  Shield,
  Loader2,
  Search,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const ScannerLoaderUI = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Scan ke time user ko dikhane wale steps
  const scanMessages = [
    "Initializing Deep Scan...",
    "Querying Google Safe Browsing...",
    "Cross-referencing 70+ VirusTotal Engines...",
    "Running Local BERT AI Analysis...",
    "Aggregating Threat Intelligence...",
  ];

  // Ye effect UI mein fake progress dikhane ke liye hai
  useEffect(() => {
    let interval;
    if (isScanning && scanStep < scanMessages.length - 1) {
      interval = setTimeout(() => {
        setScanStep((prev) => prev + 1);
      }, 2500); // Har 2.5 second mein naya message aayega
    } else if (isScanning && scanStep === scanMessages.length - 1) {
      // Aakhri step par aakar scan complete kardo
      setTimeout(() => {
        setIsScanning(false);
        setShowResult(true);
        setScanStep(0);
      }, 2000);
    }
    return () => clearTimeout(interval);
  }, [isScanning, scanStep]);

  const handleMockScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setShowResult(false);
    setIsScanning(true);
    setScanStep(0);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_0_40px_rgba(30,58,138,0.15)] text-white font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <Shield className="text-blue-500 w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Threat Scanner</h2>
          <p className="text-slate-400 text-sm">Powered by 3-Layer AI Engine</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleMockScan} className="flex flex-col gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="url"
            placeholder="Enter suspicious URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isScanning}
            required
            className="w-full pl-12 p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-all focus:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 placeholder:text-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={isScanning || !url}
          className="w-full flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed group"
        >
          {isScanning ? (
            <div className="flex items-center gap-3 w-full justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
              <div className="flex flex-col items-start w-64">
                <span className="text-sm font-medium text-slate-200">
                  {scanMessages[scanStep]}
                </span>
                {/* Chhoti si fake progress bar */}
                <div className="w-full bg-slate-700 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((scanStep + 1) / scanMessages.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <span>Launch Deep Scan</span>
          )}
        </button>
      </form>

      {/* Mock Result Card (Scan khatam hone ke baad dikhega) */}
      {showResult && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Analysis Complete
                </h3>
                <p className="text-sm text-slate-400 truncate max-w-62.5">
                  {url}
                </p>
              </div>
              <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2 text-red-400 text-sm font-bold">
                <AlertTriangle className="w-4 h-4" />
                PHISHED
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                <span className="text-slate-400">Google Safe Browsing</span>
                <span className="text-green-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Clean
                </span>
              </div>
              <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                <span className="text-slate-400">VirusTotal Detection</span>
                <span className="text-yellow-400 font-medium">
                  3/94 Engines
                </span>
              </div>
              <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg border border-red-500/20">
                <span className="text-slate-400">BERT AI Prediction</span>
                <span className="text-red-400 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Malicious
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerLoaderUI;
