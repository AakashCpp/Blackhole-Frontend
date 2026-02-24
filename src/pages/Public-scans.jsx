import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 YAHAN ADD KIYA
import ReportOverview from "../components/ReportOverview";

function PublicScans() {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <div className="min-h-screen w-full px-6 py-6 text-white">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Public Scans</h1>
        <p className="text-zinc-400 text-sm">
          View publicly available scan reports
        </p>
      </div>

      {/* ================= TOGGLE TABS ================= */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("web")}
          className={`px-4 py-2 rounded-lg text-sm transition
            ${
              activeTab === "web"
                ? "bg-indigo-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          🌐 Web History
        </button>

        <button
          onClick={() => setActiveTab("vuln")}
          className={`px-4 py-2 rounded-lg text-sm transition
            ${
              activeTab === "vuln"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
        >
          🛡 Vulnerability History
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div>
        {activeTab === "web" && <WebHistory />}
        {activeTab === "vuln" && <VulnerabilityHistory />}
      </div>
    </div>
  );
}

export default PublicScans;

const WebHistory = () => {
  const navigate = useNavigate(); // 👈 HOOK YAHAN SETUP KIYA

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
          onExpand={() => navigate(`/scan-details/web/${report.id}`)} // 👈 NAVIGATE YAHAN LAGAYA
        />
      ))}
    </div>
  );
};

const VulnerabilityHistory = () => {
  const navigate = useNavigate(); // 👈 HOOK YAHAN SETUP KIYA

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
          onExpand={() => navigate(`/scan-details/vuln/${report.id}`)} // 👈 NAVIGATE YAHAN LAGAYA
        />
      ))}
    </div>
  );
};
