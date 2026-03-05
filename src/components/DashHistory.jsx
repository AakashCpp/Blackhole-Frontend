import React, { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReportOverview from "./ReportOverview";
import api from "../utils/axiosInstance";

export default function DashHistory() {
  const [activeTab, setActiveTab] = useState("web");

  const [webReports, setWebReports] = useState([]);
  const [vulnReports, setVulnReports] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/jobs/my-jobs");

      console.log(res?.data?.data);

      const jobs = res?.data?.data || [];

      const web = jobs.filter((j) => j.type === "web");
      const vuln = jobs.filter((j) => j.type === "vuln");

      setWebReports(web);
      setVulnReports(vuln);
    } catch (error) {
      console.error("Error fetching scans:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab("web")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "web"
                ? "bg-white text-teal-600 shadow"
                : "text-slate-500"
            }`}
          >
            Web Scan History
          </button>

          <button
            onClick={() => setActiveTab("vulnerability")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "vulnerability"
                ? "bg-white text-teal-600 shadow"
                : "text-slate-500"
            }`}
          >
            Vulnerability Scan History
          </button>
        </div>

        <button className="p-2 rounded-lg hover:bg-slate-100 transition">
          <ArrowUpDown size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading && (
          <p className="text-center text-slate-500">Loading scan history...</p>
        )}

        {!loading && activeTab === "web" && <WebHistory reports={webReports} />}

        {!loading && activeTab === "vulnerability" && (
          <VulnerabilityHistory reports={vulnReports} />
        )}
      </div>
    </div>
  );
}

const WebHistory = ({ reports }) => {
  const navigate = useNavigate();

  const handleExpand = (report) => {
    navigate(`/scan-details/web/${report._id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reports?.map((report) => (
        <ReportOverview
          key={report._id}
          title={report.target}
          subtitle="Web Scan"
          stats={[
            { label: "Risk Score", value: report.scanResults?.[0]?.risk_score },
            {
              label: "Vulnerabilities",
              value: report.scanResults?.[0]?.total_vulnerabilities,
            },
          ]}
          tags={
            report.scanResults?.[0]?.results?.ports?.open_ports?.map(
              (p) => `Port ${p.port}`,
            ) || []
          }
          onExpand={() => handleExpand(report)}
        />
      ))}
    </div>
  );
};

const VulnerabilityHistory = ({ reports }) => {
  const navigate = useNavigate();

  const handleExpand = (report) => {
    navigate(`/scan-details/vuln/${report._id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reports?.map((report) => (
        <ReportOverview
          key={report._id}
          title={report.target}
          subtitle="Vulnerability Scan"
          stats={[
            {
              label: "Severity Score",
              value: report.scanResults?.[0]?.risk_score || "N/A",
            },
            {
              label: "Issues Found",
              value: report.scanResults?.[0]?.total_vulnerabilities || 0,
            },
          ]}
          tags={["Security Scan"]}
          onExpand={() => handleExpand(report)}
        />
      ))}
    </div>
  );
};
