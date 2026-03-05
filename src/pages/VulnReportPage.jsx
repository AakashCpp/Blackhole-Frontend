import React, { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Info,
  ChevronDown,
  CheckCircle,
  ExternalLink,
  Globe,
  ArrowLeft,
  Download,
  Check,
  Copy,
  RotateCcw,
} from "lucide-react";

// --- UPDATED IMPORTS FOR CHARTS & PDF ---
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// --- 1. THE DATA (Static) ---

// --- 2. HELPERS & REUSABLE UI ---

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
};

// Toast Notification Component
const Toast = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 pointer-events-none"
  >
    <CheckCircle size={16} className="text-green-400" />
    <span className="text-sm font-medium">{message}</span>
  </motion.div>
);

const RiskBadge = ({ risk }) => {
  const styles = {
    High: "bg-red-50 text-red-700 border-red-100",
    Medium: "bg-orange-50 text-orange-700 border-orange-100",
    Low: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Informational: "bg-blue-50 text-blue-700 border-blue-100",
  };
  const defaultStyle = "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[risk] || defaultStyle}`}
    >
      {risk}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, colorClass, delay = 0 }) => {
  const getTheme = () => {
    if (colorClass.includes("orange"))
      return {
        bg: "bg-orange-50",
        ring: "bg-orange-400",
        text: "text-orange-600",
      };
    if (colorClass.includes("yellow"))
      return {
        bg: "bg-yellow-50",
        ring: "bg-yellow-400",
        text: "text-yellow-600",
      };
    if (colorClass.includes("blue"))
      return { bg: "bg-blue-50", ring: "bg-blue-400", text: "text-blue-600" };
    return { bg: "bg-gray-100", ring: "bg-gray-400", text: "text-gray-700" };
  };
  const theme = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
      className="relative bg-white p-5 rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-default h-full"
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`relative p-3 rounded-lg ${theme.bg}`}>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-lg ${theme.ring} opacity-20`}
          />
          <Icon size={24} className={theme.text} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900">
            <AnimatedNumber value={value} />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. CHART COMPONENT ---
const RiskDonutChart = ({ data, onFilterChange }) => {
  const chartData = [
    { name: "Medium", value: data.medium, color: "#f97316" },
    { name: "Low", value: data.low, color: "#eab308" },
    { name: "Info", value: data.info, color: "#3b82f6" },
  ].filter((item) => item.value > 0);

  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative">
      <h3 className="text-gray-500 text-sm font-medium absolute top-4 left-4">
        Risk Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onClick={(data) => {
              if (onFilterChange)
                onFilterChange(
                  data.name === "Info" ? "Informational" : data.name,
                );
            }}
            cursor="pointer"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{
              color: "#374151",
              fontSize: "12px",
              fontWeight: "500",
            }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- 4. INTERACTIVE CARD COMPONENT ---
const VulnerabilityCard = ({
  data,
  isResolved,
  onToggleResolve,
  showToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy Logic
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(data.solution);
    setCopied(true);
    showToast("Solution copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResolve = (e) => {
    e.stopPropagation();
    onToggleResolve(data.id);
    if (!isResolved) showToast("Marked as Fixed");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`border rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden ${
        isResolved ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 cursor-pointer flex items-start justify-between group"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`text-sm font-semibold transition-colors ${
                isResolved
                  ? "text-green-800 line-through decoration-green-500/50"
                  : "text-gray-900 group-hover:text-blue-600"
              }`}
            >
              {data.name}
            </h3>

            {isResolved ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-200 text-green-800 border border-green-300 flex items-center gap-1 shadow-sm">
                <Check size={12} strokeWidth={3} /> FIXED
              </span>
            ) : (
              <RiskBadge risk={data.risk} />
            )}
          </div>
          <div className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-1">
            <Globe size={12} /> {data.url}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleResolve}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 z-10 border ${
              isResolved
                ? "bg-white text-gray-500 border-gray-200 hover:text-gray-800 hover:bg-gray-50"
                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-green-100 hover:text-green-600 hover:border-green-200"
            }`}
            title={isResolved ? "Undo Fix" : "Mark as Resolved"}
          >
            {isResolved ? <RotateCcw size={16} /> : <Check size={16} />}
          </button>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-gray-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50/50"
          >
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-gray-700">{data.description}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase">
                      Solution
                    </h4>
                    <button
                      onClick={handleCopy}
                      className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-700 font-mono shadow-sm">
                    {data.solution}
                  </div>
                </div>
              </div>
              {data.reference && (
                <div className="pt-2">
                  <a
                    href={data.reference.split("\n")[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 w-fit"
                  >
                    Open Documentation <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- 5. MAIN DASHBOARD ---

const SecurityReportDashboard = ({ SCAN_DATA }) => {
  console.log(SCAN_DATA?.[0]);

  const [filter, setFilter] = useState("All");
  const [resolvedIds, setResolvedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Stats Logic
  const stats = useMemo(() => {
    const total = SCAN_DATA.totalFindings;
    const high = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "High",
    ).length;
    const medium = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Medium",
    ).length;
    const low = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Low",
    ).length;
    const info = SCAN_DATA.vulnerabilities.filter(
      (v) => v.risk === "Informational",
    ).length;
    return { total, medium, low, info, high };
  }, []);

  // Filter Logic (Search + Risk Tab)
  const filteredData = SCAN_DATA.vulnerabilities.filter((item) => {
    const matchesRisk = filter === "All" || item.risk === filter;
    return matchesRisk;
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleToggleResolve = (id) => {
    if (resolvedIds.includes(id)) {
      setResolvedIds(resolvedIds.filter((itemId) => itemId !== id));
    } else {
      setResolvedIds([...resolvedIds, id]);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Progress Calculation
  const progressPercentage = Math.round(
    (resolvedIds.length / SCAN_DATA.totalFindings) * 100,
  );

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Security Scan Report", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Target: ${SCAN_DATA.target}`, 14, 30);
    doc.text(`Date: ${SCAN_DATA.scanDate}`, 14, 35);

    doc.text(`Total Findings: ${stats.total}`, 14, 45);
    doc.text(
      `Medium: ${stats.medium} | Low: ${stats.low} | Info: ${stats.info} | High: ${stats.high}`,
      14,
      50,
    );

    const tableColumn = ["Risk", "Status", "Vulnerability", "URL", "CWE ID"];
    const tableRows = [];

    SCAN_DATA.vulnerabilities.forEach((vuln) => {
      const isFixed = resolvedIds.includes(vuln.id) ? "FIXED" : "OPEN";
      const vulnerabilityData = [
        vuln.risk,
        isFixed,
        vuln.name,
        vuln.url,
        vuln.cweid,
      ];
      tableRows.push(vulnerabilityData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [31, 41, 55] },
    });

    doc.save("security_scan_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6 md:p-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Actions Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors py-2 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Go Back</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          >
            <Download size={16} /> Export Report
          </button>
        </div>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Scan Report
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              Target:{" "}
              <span className="font-mono text-gray-700 bg-gray-200 px-1.5 rounded">
                {SCAN_DATA.target}
              </span>
            </p>
          </div>

          {/* Progress Bar (Gamification) */}
          <div className="flex flex-col items-end gap-1 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <span>Remediation Progress</span>
              <span className="text-gray-900 font-bold">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full md:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${progressPercentage === 100 ? "bg-green-500" : "bg-blue-600"}`}
              />
            </div>
          </div>
        </header>

        {/* ANALYTICS GRID: Chart + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RiskDonutChart data={stats} onFilterChange={setFilter} />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="Total Findings"
              value={stats.total}
              icon={Shield}
              colorClass="bg-gray-800"
              delay={0.1}
            />
            <StatCard
              label="High Risks"
              value={stats.high}
              icon={AlertTriangle}
              colorClass="bg-red-800"
              delay={0.2}
            />
            <StatCard
              label="Medium Risks"
              value={stats.medium}
              icon={AlertTriangle}
              colorClass="bg-orange-500"
              delay={0.2}
            />
            <StatCard
              label="Low Risks"
              value={stats.low}
              icon={AlertTriangle}
              colorClass="bg-yellow-500"
              delay={0.3}
            />
            <StatCard
              label="Informational"
              value={stats.info}
              icon={Info}
              colorClass="bg-blue-500"
              delay={0.4}
            />
          </div>
        </div>

        {/* Filters & List */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-800 w-full md:w-auto">
              Detailed Findings
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Filter Tabs */}
              <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm w-full sm:w-auto overflow-x-auto">
                {["All", "High", "Medium", "Low", "Informational"].map(
                  (riskType) => (
                    <button
                      key={riskType}
                      onClick={() => setFilter(riskType)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                        filter === riskType
                          ? "bg-gray-900 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {riskType}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredData.map((vuln, index) => (
                <VulnerabilityCard
                  key={vuln.id || index}
                  data={vuln}
                  isResolved={resolvedIds.includes(vuln.id)}
                  onToggleResolve={handleToggleResolve}
                  showToast={showToast}
                />
              ))}
            </AnimatePresence>
            {filteredData.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-400">
                  No vulnerabilities found matching criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReportDashboard;
