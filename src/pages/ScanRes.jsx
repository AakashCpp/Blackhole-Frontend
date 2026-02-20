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
  Terminal,
} from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const data = {
  target: "https://openai.com",
  ip_address: "172.64.154.211",
  scan_time: "2026-01-29T22:13:42.983515",
  duration: 97.29712748527527,
  grade: "B",
  risk_score: 26,
  total_vulnerabilities: 6,
  port_results: {
    open_ports: [
      {
        port: 80,
        service: "HTTP",
        risk: "low",
        banner:
          "HTTP/1.1 400 Bad Request\r\nDate: Thu, 29 Jan 2026 16:43:45 GMT\r\nContent-Length: 68\r\nConnection: close\r\nCache-Control: private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0\r",
      },
      {
        port: 443,
        service: "HTTPS",
        risk: "low",
        banner: "",
      },
    ],
    summary: {
      total_scanned: 24,
      open_ports: 2,
      risk_breakdown: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 2,
      },
      critical_findings: [],
      high_findings: [],
    },
  },
  ssl_results: {
    has_ssl: true,
    is_valid: false,
    grade: "C",
    version: "TLSv1.3",
    issuer: "WE1",
    expires: "2026-04-23",
    days_until_expiry: 83,
    vulnerabilities: [],
  },
  header_results: {
    score: 73,
    grade: "B",
    summary: "6 present, 0 partial, 2 missing out of 8 headers",
    missing_headers: [
      {
        name: "Content-Security-Policy",
        importance: "critical",
        description: "Prevents XSS and injection attacks",
        weight: 20,
      },
      {
        name: "X-XSS-Protection",
        importance: "low",
        description: "Legacy XSS filter (deprecated in modern browsers)",
        weight: 5,
      },
    ],
    present_headers: [
      {
        name: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
        importance: "critical",
        weight: 20,
        is_partial: false,
      },
      {
        name: "X-Frame-Options",
        value: "SAMEORIGIN",
        importance: "high",
        weight: 15,
        is_partial: false,
      },
      {
        name: "X-Content-Type-Options",
        value: "nosniff",
        importance: "high",
        weight: 15,
        is_partial: false,
      },
      {
        name: "Referrer-Policy",
        value: "same-origin",
        importance: "medium",
        weight: 10,
        is_partial: false,
      },
      {
        name: "Permissions-Policy",
        value:
          "accelerometer=(),browsing-topics=(),camera=(),clipboard-read=(),clipboard-write=(),geolocation=(),gyroscope=(),hid=(),interest-cohort=(),magnetometer=",
        importance: "medium",
        weight: 10,
        is_partial: false,
      },
      {
        name: "Cross-Origin-Opener-Policy",
        value: "same-origin",
        importance: "low",
        weight: 5,
        is_partial: false,
      },
    ],
    partial_headers: [],
    information_disclosure: [
      {
        header: "server",
        value: "cloudflare",
        description: "Server software",
        penalty: 2,
      },
    ],
    other_issues: [],
  },
  vuln_results: {
    vulnerabilities: [],
    sensitive_files: [
      {
        file: "robots.txt",
        url: "https://openai.com/robots.txt",
        status: 200,
        size: 98,
        risk: "medium",
      },
      {
        file: "sitemap.xml",
        url: "https://openai.com/sitemap.xml",
        status: 200,
        size: 1545,
        risk: "medium",
      },
    ],
    risk_score: 10,
  },
  dir_results: {
    found_directories: [
      {
        path: "administrator",
        url: "https://openai.com/administrator",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "login",
        url: "https://openai.com/login",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "admin",
        url: "https://openai.com/admin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "phpmyadmin",
        url: "https://openai.com/phpmyadmin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "panel",
        url: "https://openai.com/panel",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "conf",
        url: "https://openai.com/conf",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "api",
        url: "https://openai.com/api",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "config",
        url: "https://openai.com/config",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "adminer",
        url: "https://openai.com/adminer",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "api/v2",
        url: "https://openai.com/api/v2",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "settings",
        url: "https://openai.com/settings",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "old",
        url: "https://openai.com/old",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "graphql",
        url: "https://openai.com/graphql",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "test",
        url: "https://openai.com/test",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "development",
        url: "https://openai.com/development",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "rest",
        url: "https://openai.com/rest",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "staging",
        url: "https://openai.com/staging",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "api/v1",
        url: "https://openai.com/api/v1",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "wp-admin",
        url: "https://openai.com/wp-admin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "upload",
        url: "https://openai.com/upload",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "manager",
        url: "https://openai.com/manager",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "configuration",
        url: "https://openai.com/configuration",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "uploads",
        url: "https://openai.com/uploads",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "files",
        url: "https://openai.com/files",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "secret",
        url: "https://openai.com/secret",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "media",
        url: "https://openai.com/media",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "dev",
        url: "https://openai.com/dev",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "backup",
        url: "https://openai.com/backup",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: ".env",
        url: "https://openai.com/.env",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "documents",
        url: "https://openai.com/documents",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "dashboard",
        url: "https://openai.com/dashboard",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "internal",
        url: "https://openai.com/internal",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: ".git",
        url: "https://openai.com/.git",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "private",
        url: "https://openai.com/private",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: ".htpasswd",
        url: "https://openai.com/.htpasswd",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "assets",
        url: "https://openai.com/assets",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "wp-content",
        url: "https://openai.com/wp-content",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: ".svn",
        url: "https://openai.com/.svn",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "wp-includes",
        url: "https://openai.com/wp-includes",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "hidden",
        url: "https://openai.com/hidden",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "cgi-bin",
        url: "https://openai.com/cgi-bin",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "static",
        url: "https://openai.com/static",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "includes",
        url: "https://openai.com/includes",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "js",
        url: "https://openai.com/js",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "scripts",
        url: "https://openai.com/scripts",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "testing",
        url: "https://openai.com/testing",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "images",
        url: "https://openai.com/images",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "logs",
        url: "https://openai.com/logs",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "server-status",
        url: "https://openai.com/server-status",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "error_log",
        url: "https://openai.com/error_log",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "css",
        url: "https://openai.com/css",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "server-info",
        url: "https://openai.com/server-info",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "mysql",
        url: "https://openai.com/mysql",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "bin",
        url: "https://openai.com/bin",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "db",
        url: "https://openai.com/db",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "database",
        url: "https://openai.com/database",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "inc",
        url: "https://openai.com/inc",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: "log",
        url: "https://openai.com/log",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "sql",
        url: "https://openai.com/sql",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
      {
        path: ".htaccess",
        url: "https://openai.com/.htaccess",
        status: 403,
        type: "forbidden",
        interesting: false,
      },
    ],
    interesting_findings: [
      {
        path: "administrator",
        url: "https://openai.com/administrator",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "login",
        url: "https://openai.com/login",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "admin",
        url: "https://openai.com/admin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "phpmyadmin",
        url: "https://openai.com/phpmyadmin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "api",
        url: "https://openai.com/api",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "config",
        url: "https://openai.com/config",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "adminer",
        url: "https://openai.com/adminer",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "api/v2",
        url: "https://openai.com/api/v2",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "test",
        url: "https://openai.com/test",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "api/v1",
        url: "https://openai.com/api/v1",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "wp-admin",
        url: "https://openai.com/wp-admin",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "configuration",
        url: "https://openai.com/configuration",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "secret",
        url: "https://openai.com/secret",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "backup",
        url: "https://openai.com/backup",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: ".env",
        url: "https://openai.com/.env",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: ".git",
        url: "https://openai.com/.git",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "private",
        url: "https://openai.com/private",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "testing",
        url: "https://openai.com/testing",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "logs",
        url: "https://openai.com/logs",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "error_log",
        url: "https://openai.com/error_log",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "db",
        url: "https://openai.com/db",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "database",
        url: "https://openai.com/database",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
      {
        path: "log",
        url: "https://openai.com/log",
        status: 403,
        type: "forbidden",
        interesting: true,
      },
    ],
    total_checked: 66,
  },
  tech_results: {
    server: "cloudflare",
    cms: "WordPress",
    technologies: [
      {
        name: "cloudflare",
        category: "Web Server",
        source: "Header",
      },
      {
        name: "WordPress",
        category: "CMS",
        source: "Path: /wp-login.php",
      },
      {
        name: "Joomla",
        category: "CMS",
        source: "Path: /administrator/",
      },
      {
        name: "Drupal",
        category: "CMS",
        source: "Path: /user/login",
      },
      {
        name: "Magento",
        category: "CMS",
        source: "Path: /admin/",
      },
    ],
    javascript_libraries: [],
  },
};

const ScanRes = () => {
  const printRef = useRef();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Fallback if data is not yet loaded
  if (!data) return <div className="p-10 text-center">Loading Report...</div>;

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
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(element, {
        quality: 0.95,
        backgroundColor: "#F8FAFC",
        cacheBust: true,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save(`Security_Report_${data.target.replace("https://", "")}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Could not generate PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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

      {/* --- Main Content --- */}
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
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-slate-50">
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-indigo-400" />
                      <span className="font-medium text-slate-700">
                        {data.target}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server size={16} className="text-indigo-400" />
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-100">
                        {data.ip_address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-sm">
                <Clock size={16} className="text-slate-400" />
                <span className="text-slate-500">Scan duration:</span>
                <span className="font-bold text-slate-700">
                  {data.duration?.toFixed(1)}s
                </span>
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
                      strokeDashoffset={data.grade === "A" ? "0" : "50"}
                      className="text-emerald-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-slate-800">
                    {data.grade}
                  </div>
                </div>
              </div>
            </OverviewCard>

            <OverviewCard
              title="Risk Score"
              icon={<AlertTriangle size={20} className="text-amber-500" />}
              subtext={
                data.risk_score < 30 ? "Low Risk Level" : "Elevated Risk"
              }
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-5xl font-bold text-slate-800">
                  {data.risk_score}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                  out of 100
                </span>
              </div>
            </OverviewCard>

            <OverviewCard
              title="Vulnerabilities"
              icon={<FileText size={20} className="text-rose-500" />}
              subtext="Findings Summary"
            >
              <div className="flex items-center justify-between px-4 h-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">
                    {data.port_results?.summary?.risk_breakdown?.critical || 0}
                  </div>
                  <div className="text-xs text-slate-400">Crit</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">
                    {data.port_results?.summary?.risk_breakdown?.high || 0}
                  </div>
                  <div className="text-xs text-slate-400">High</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {data.port_results?.summary?.risk_breakdown?.medium || 0}
                  </div>
                  <div className="text-xs text-slate-400">Med</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {data.port_results?.summary?.risk_breakdown?.low || 0}
                  </div>
                  <div className="text-xs text-slate-400">Low</div>
                </div>
              </div>
            </OverviewCard>
          </div>

          {/* 3. Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* Technology Stack */}
              <Card
                title="Technology Stack"
                icon={<LayoutGrid size={20} className="text-indigo-500" />}
              >
                <div className="grid grid-cols-2 gap-4">
                  {data.tech_results?.technologies?.map((tech, idx) => (
                    <TechItem
                      key={idx}
                      name={tech.name}
                      type={tech.category}
                      icon={
                        tech.name === "React" ? (
                          <Terminal size={18} />
                        ) : (
                          <Globe size={18} />
                        )
                      }
                      status="Detected"
                      color={idx % 2 === 0 ? "blue" : "indigo"}
                    />
                  ))}
                </div>
              </Card>

              {/* Open Ports */}
              <Card
                title="Open Ports"
                icon={<Globe size={20} className="text-cyan-500" />}
              >
                <div className="bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100">
                  <Table
                    headers={["Port", "Service", "Risk"]}
                    rows={
                      data.port_results?.open_ports?.map((p) => [
                        <span className="font-mono text-slate-600">
                          {p.port}
                        </span>,
                        <span className="flex items-center gap-2">
                          {p.service}
                        </span>,
                        <Badge color={p.risk === "low" ? "emerald" : "amber"}>
                          {p.risk}
                        </Badge>,
                      ]) || []
                    }
                  />
                </div>
              </Card>

              {/* SSL Configuration */}
              <Card
                title="SSL Configuration"
                icon={<Lock size={20} className="text-rose-500" />}
              >
                <div className="flex items-center justify-between p-4 bg-linear-to-r from-rose-50 to-white rounded-xl border border-rose-100 mb-4">
                  <div>
                    <div className="text-sm text-rose-800 font-medium">
                      SSL Grade
                    </div>
                    <div className="text-2xl font-bold text-rose-600">
                      {data.ssl_results?.grade}
                    </div>
                  </div>
                  <Lock size={32} className="text-rose-200" />
                </div>
                <InfoRow label="Protocol" value={data.ssl_results?.version} />
                <InfoRow
                  label="Issuer"
                  value={data.ssl_results?.issuer
                    ?.split(" ")
                    .slice(0, 3)
                    .join(" ")}
                />
                <InfoRow
                  label="Expiry"
                  value={`${data.ssl_results?.days_until_expiry} Days Remaining`}
                />
              </Card>
            </div>

            <div className="space-y-8">
              {/* Security Headers */}
              <Card
                title="Security Headers"
                icon={<Shield size={20} className="text-teal-500" />}
              >
                <div className="space-y-3">
                  {data.header_results?.present_headers
                    ?.slice(0, 3)
                    .map((h, i) => (
                      <HeaderItem
                        key={i}
                        name={h.name}
                        status="Present"
                        type="success"
                        desc="Header is active"
                      />
                    ))}
                  {data.header_results?.missing_headers
                    ?.slice(0, 2)
                    .map((h, i) => (
                      <HeaderItem
                        key={i}
                        name={h.name}
                        status="Missing"
                        type="danger"
                        desc={h.description}
                      />
                    ))}
                </div>
              </Card>

              {/* Directory Enumeration */}
              <Card
                title="Directory Enumeration"
                icon={<Folder size={20} className="text-amber-500" />}
              >
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500 border-b border-slate-100 flex justify-between">
                    <span>PATH</span>
                    <span>STATUS</span>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                    {data.dir_results?.found_directories
                      ?.slice(0, 10)
                      .map((dir, idx) => (
                        <DirectoryItem
                          key={idx}
                          path={`/${dir.path}`}
                          code={dir.status}
                          warning={dir.interesting}
                        />
                      ))}
                  </div>
                </div>
              </Card>

              {/* Critical Findings */}
              <Card
                title="Critical Findings"
                icon={<AlertTriangle size={20} className="text-rose-500" />}
              >
                <Table
                  headers={["Vulnerability", "Severity"]}
                  rows={[
                    ...(data.vuln_results?.vulnerabilities?.map((v) => [
                      <span className="font-medium text-slate-700">
                        {v.type}
                      </span>,
                      <Badge color={v.risk === "high" ? "rose" : "amber"}>
                        {v.risk}
                      </Badge>,
                    ]) || []),
                    ...(data.vuln_results?.sensitive_files?.map((f) => [
                      <span className="font-medium text-slate-700">
                        {f.file} Leak
                      </span>,
                      <Badge color="amber">Medium</Badge>,
                    ]) || []),
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

// --- Sub Components (Internal) ---

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
        className={`group-hover:text-amber-400 transition-colors ${warning ? "text-amber-400" : "text-slate-300"}`}
      />
      <span className="text-sm font-mono text-slate-600">{path}</span>
    </div>
    <span
      className={`text-xs font-bold px-2 py-1 rounded ${warning ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-100 text-slate-500 border border-slate-200"}`}
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
        {icons[type]} {status}
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
