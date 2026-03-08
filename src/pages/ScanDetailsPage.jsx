import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ScanRes from "./ScanRes";
import SecurityReportDashboard from "./VulnReportPage";
import api from "../utils/axiosInstance";

export default function ScanDetailsPage() {
  const { type, id } = useParams();

  // Yahan par tum future me Redux ya API se data fetch kar sakte ho using 'id' aur 'type'
  // const [data, setData] = useState(null);
  // useEffect(() => { fetch(`/api/scan/${type}/${id}`) }, [id, type]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get(`/jobs/${type}/${id}`);

        let scanData = null;

        if (type === "vuln") {
          scanData = res?.data?.data?.scanResults?.[0];
        } else {
          scanData = res?.data?.data?.scanResults?.[0];
        }

        setData(scanData);
        console.log("Fetched scan data:", scanData);
      } catch (error) {
        console.error("Error fetching scans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [type, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (type === "web") {
    // Agar hume API se data pass karna hota toh hum prop me bhejte: <ScanRes data={data} />
    // Lekin abhi ke liye tumhare ScanRes me static data hai, toh sirf component render karo.
    return <ScanRes data={data} />;
  }

  if (type === "vuln") {
    return <SecurityReportDashboard SCAN_DATA={data} />;
  }
  return <Navigate to="/" replace />;
}
