import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import ReportOverview from "./ReportOverview";

/* =========================
   MAIN COMPONENT
========================= */
export default function DashHistory() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3">
        {/* Toggle Tabs */}
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab("web")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all
              ${
                activeTab === "web"
                  ? "bg-white text-teal-600 shadow"
                  : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Web Scan History
          </button>

          <button
            onClick={() => setActiveTab("vulnerability")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all
              ${
                activeTab === "vulnerability"
                  ? "bg-white text-teal-600 shadow"
                  : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Vulnerability Scan History
          </button>
        </div>

        {/* Sort Button */}
        <button className="p-2 rounded-lg hover:bg-slate-100 transition">
          <ArrowUpDown size={18} className="text-slate-600" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "web" && <WebHistory />}
        {activeTab === "vulnerability" && <VulnerabilityHistory />}
      </div>
    </div>
  );
}

/* =========================
   WEB HISTORY
========================= */
const WebHistory = () => {
  const webReports = [
    {
      id: 1,
      url: "https://example.com/admin/login",
      risk: "Low",
      requests: 342,
      ports: ["22", "80", "443"],
    },
    {
      id: 2,
      url: "https://testsite.in/api",
      risk: "High",
      requests: 1245,
      ports: ["80", "443", "8080", "3306"],
    },
    {
      id: 3,
      url: "https://secure.app/dashboard",
      risk: "Medium",
      requests: 612,
      ports: ["443"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {webReports.map((report) => (
        <ReportOverview
          key={report.id}
          title={report.url}
          subtitle="Web Scan"
          stats={[
            { label: "Risk Level", value: report.risk },
            { label: "Total Requests", value: report.requests },
          ]}
          tags={report.ports.map((p) => `Port ${p}`)}
          onExpand={() => console.log("Expand Web Report:", report.url)}
        />
      ))}
    </div>
  );
};

/* =========================
   VULNERABILITY HISTORY
========================= */
const VulnerabilityHistory = () => {
  const vulnReports = [
    {
      id: 1,
      target: "Auth Server",
      severity: "Critical",
      issues: ["Broken Auth", "JWT Misconfig", "Rate Limit Missing"],
    },
    {
      id: 2,
      target: "Payment API",
      severity: "High",
      issues: ["SQL Injection", "Sensitive Data Exposure"],
    },
    {
      id: 3,
      target: "Dashboard UI",
      severity: "Medium",
      issues: ["XSS", "Insecure Headers"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vulnReports.map((report) => (
        <ReportOverview
          key={report.id}
          title={report.target}
          subtitle="Vulnerability Scan"
          stats={[
            { label: "Severity", value: report.severity },
            { label: "Issues Found", value: report.issues.length },
          ]}
          tags={report.issues}
          onExpand={() =>
            console.log("Expand Vulnerability Report:", report.target)
          }
        />
      ))}
    </div>
  );
};
