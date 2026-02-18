import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Shield,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lock,
  Server,
  FileText,
  Folder,
  LayoutGrid,
  Info,
  ChevronRight,
  Terminal,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ScanRes = () => {
  const printRef = useRef();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // --- Actions ---
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log("No history to go back to");
    }
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGeneratingPdf(true);

    try {
      // 1. Capture the content with high scale for clarity
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff", // Pure white background for PDF
        logging: false,
        windowWidth: element.scrollWidth, // Ensure full width is captured
        windowHeight: element.scrollHeight, // Ensure full height is captured
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Setup A4 PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 3. Calculate dimensions to fit width
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      // 4. Add pages
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("security-report.pdf");
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-50 selection:text-indigo-600">
      {/* --- Navbar --- */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center"
      >
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <div className="p-2 rounded-full group-hover:bg-slate-50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span>Back</span>
        </button>

        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100"
        >
          {isGeneratingPdf ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <>
              <Download size={18} />
              <span>Save Report</span>
            </>
          )}
        </button>
      </motion.div>

      {/* --- Main Report Content (Ref for PDF) --- */}
      <div className="p-4 md:p-8 lg:px-12 max-w-7xl mx-auto" ref={printRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* 1. Header Section */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-linear-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex gap-5">
                <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                  <Shield size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Security Scan Report
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-indigo-400" />
                      <span className="font-medium text-slate-700">
                        https://openai.com
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server size={16} className="text-indigo-400" />
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-100">
                        172.64.154.211
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-sm">
                <Clock size={16} className="text-slate-400" />
                <span className="text-slate-500">Scan duration:</span>
                <span className="font-bold text-slate-700">97.3s</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard
              title="Security Grade"
              icon={<Shield size={20} className="text-emerald-500" />}
              subtext="Passing Standard"
            >
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-50"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="50"
                      className="text-emerald-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-slate-800">
                    B
                  </div>
                </div>
              </div>
            </OverviewCard>

            <OverviewCard
              title="Risk Score"
              icon={<AlertTriangle size={20} className="text-amber-500" />}
              subtext="Low Risk Level"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl font-bold text-slate-800">26</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  out of 100
                </span>
              </div>
            </OverviewCard>

            <OverviewCard
              title="Vulnerabilities"
              icon={<FileText size={20} className="text-rose-500" />}
              subtext="Requires Attention"
            >
              <div className="flex items-center justify-between px-4 h-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">1</div>
                  <div className="text-xs text-slate-400">High</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">2</div>
                  <div className="text-xs text-slate-400">Med</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">3</div>
                  <div className="text-xs text-slate-400">Low</div>
                </div>
              </div>
            </OverviewCard>
          </div>

          {/* 3. Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Technology Stack - Improved */}
              <Card
                title="Technology Stack"
                icon={<LayoutGrid size={20} className="text-indigo-500" />}
              >
                <div className="grid grid-cols-2 gap-4">
                  <TechItem
                    name="Cloudflare"
                    type="CDN / WAF"
                    icon={<Globe size={18} />}
                    status="Active"
                    color="blue"
                  />
                  <TechItem
                    name="WordPress"
                    type="CMS"
                    icon={<LayoutGrid size={18} />}
                    status="Detected"
                    color="indigo"
                  />
                  <TechItem
                    name="Nginx"
                    type="Web Server"
                    icon={<Server size={18} />}
                    status="Inferred"
                    color="slate"
                  />
                  <TechItem
                    name="PHP"
                    type="Language"
                    icon={<Terminal size={18} />}
                    status="v8.1.0"
                    color="purple"
                  />
                </div>
              </Card>

              <Card
                title="Open Ports"
                icon={<Globe size={20} className="text-cyan-500" />}
              >
                <div className="bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100">
                  <Table
                    headers={["Port", "Service", "Status"]}
                    rows={[
                      [
                        <span className="font-mono text-slate-600">80</span>,
                        <span className="flex items-center gap-2">
                          <Globe size={14} className="text-slate-400" /> HTTP
                        </span>,
                        <Badge color="emerald">Open</Badge>,
                      ],
                      [
                        <span className="font-mono text-slate-600">443</span>,
                        <span className="flex items-center gap-2">
                          <Lock size={14} className="text-slate-400" /> HTTPS
                        </span>,
                        <Badge color="emerald">Open</Badge>,
                      ],
                    ]}
                  />
                </div>
              </Card>

              <Card
                title="SSL Configuration"
                icon={<Lock size={20} className="text-rose-500" />}
              >
                <div className="flex items-center justify-between p-4 bg-linear-to-r from-rose-50 to-white rounded-xl border border-rose-100 mb-4">
                  <div>
                    <div className="text-sm text-rose-800 font-medium">
                      SSL Grade
                    </div>
                    <div className="text-2xl font-bold text-rose-600">C+</div>
                  </div>
                  <Lock size={32} className="text-rose-200" />
                </div>
                <InfoRow label="Protocol" value="TLS v1.3" />
                <InfoRow label="Issuer" value="Google Trust Services" />
                <InfoRow label="Expiry" value="83 Days Remaining" />
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Security Headers */}
              <Card
                title="Security Headers"
                icon={<Shield size={20} className="text-teal-500" />}
              >
                <div className="space-y-3">
                  <HeaderItem
                    name="Content-Security-Policy"
                    status="Missing"
                    type="danger"
                    desc="Risk of XSS attacks"
                  />
                  <HeaderItem
                    name="Strict-Transport-Security"
                    status="Present"
                    type="success"
                    desc="Enforces HTTPS"
                  />
                  <HeaderItem
                    name="X-Frame-Options"
                    status="SAMEORIGIN"
                    type="success"
                    desc="Prevents Clickjacking"
                  />
                </div>
              </Card>

              {/* Directory Enumeration - Improved */}
              <Card
                title="Directory Enumeration"
                icon={<Folder size={20} className="text-amber-500" />}
              >
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-100 flex justify-between">
                    <span>PATH</span>
                    <span>STATUS</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    <DirectoryItem path="/administrator" code="403" />
                    <DirectoryItem path="/wp-admin" code="200" warning />
                    <DirectoryItem path="/.env" code="403" />
                    <DirectoryItem path="/config.json" code="404" />
                    <DirectoryItem path="/uploads" code="403" />
                    <DirectoryItem path="/administrator" code="403" />
                    <DirectoryItem path="/wp-admin" code="200" warning />
                    <DirectoryItem path="/.env" code="403" />
                    <DirectoryItem path="/config.json" code="404" />
                    <DirectoryItem path="/uploads" code="403" />
                  </div>
                </div>
              </Card>

              <Card
                title="Critical Findings"
                icon={<AlertTriangle size={20} className="text-rose-500" />}
              >
                <Table
                  headers={["Vulnerability", "Severity"]}
                  rows={[
                    [
                      <span className="font-medium text-slate-700">
                        Robots.txt Leak
                      </span>,
                      <Badge color="amber">Medium</Badge>,
                    ],
                    [
                      <span className="font-medium text-slate-700">
                        Missing CSP
                      </span>,
                      <Badge color="rose">High</Badge>,
                    ],
                  ]}
                />
              </Card>
            </div>
          </div>

          <motion.footer
            variants={itemVariants}
            className="text-center py-12 text-slate-400 text-sm"
          >
            <p>© 2026 Security Scanner Pro. All rights reserved.</p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const Card = ({ title, icon, children }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
        {icon}
      </div>
      <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const OverviewCard = ({ title, icon, subtext, children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-48"
  >
    <div className="flex justify-between items-start mb-2">
      <div className="flex flex-col">
        <span className="text-slate-500 font-medium text-sm">{title}</span>
        <span className="text-xs text-slate-400">{subtext}</span>
      </div>
      <div className="p-2 bg-slate-50 rounded-full">{icon}</div>
    </div>
    <div className="flex-1 mt-2">{children}</div>
  </motion.div>
);

const TechItem = ({ name, type, icon, status, color }) => {
  const bgColors = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="flex flex-col p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${bgColors[color]}`}>{icon}</div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
          {status}
        </div>
      </div>
      <div>
        <div className="font-bold text-slate-800 text-sm">{name}</div>
        <div className="text-xs text-slate-500">{type}</div>
      </div>
    </div>
  );
};

const DirectoryItem = ({ path, code, warning }) => (
  <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50/80 transition-colors group">
    <div className="flex items-center gap-3">
      <Folder
        size={16}
        className="text-slate-300 group-hover:text-amber-400 transition-colors"
      />
      <span className="text-sm font-mono text-slate-600">{path}</span>
    </div>
    <span
      className={`text-xs font-bold px-2 py-1 rounded ${
        warning
          ? "bg-amber-50 text-amber-600 border border-amber-100"
          : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      {code}
    </span>
  </div>
);

const HeaderItem = ({ name, status, type, desc }) => {
  const colors = {
    success: "text-emerald-600 bg-emerald-50 border-emerald-100",
    danger: "text-rose-600 bg-rose-50 border-rose-100",
    warning: "text-amber-600 bg-amber-50 border-amber-100",
  };

  const icons = {
    success: <CheckCircle size={16} />,
    danger: <AlertTriangle size={16} />,
    warning: <Info size={16} />,
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700">{name}</span>
        <span className="text-xs text-slate-400">{desc}</span>
      </div>
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${colors[type]}`}
      >
        {icons[type]}
        {status}
      </div>
    </div>
  );
};

const Table = ({ headers, rows }) => (
  <div className="w-full">
    <div className="flex bg-slate-50 border-b border-slate-100">
      {headers.map((h, i) => (
        <div
          key={i}
          className="flex-1 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
        >
          {h}
        </div>
      ))}
    </div>
    <div className="divide-y divide-slate-50">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-center hover:bg-slate-50/50 transition-colors"
        >
          {row.map((cell, j) => (
            <div key={j} className="flex-1 px-4 py-3 text-sm text-slate-700">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Badge = ({ children, color }) => {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border border-amber-100",
    rose: "bg-rose-50 text-rose-700 border border-rose-100",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${styles[color]}`}
    >
      {children}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-sm font-medium text-slate-700">{value}</span>
  </div>
);

export default ScanRes;
