import { useEffect, useState } from "react";
import HackerLoader from "../components/Loaders/3d loader/HackerLoader";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MOCK_THREAT_DATA = {
  traffic: {
    totalRequests: 101,
    requestsPerSecond: 1,
    perIP: {
      "::1": {
        count: 101,
        lastSeen: Date.now(),
      },
    },
    perEndpoint: {
      "/stats": 96,
      "/": 2,
      "/favicon.ico": 1,
      "/attack": 2,
    },
  },
  detection: {
    status: "ATTACK",
    reason: "IP flooding detected: ::1",
    detectedAt: new Date().toISOString(),
  },
  blockedIPs: ["::1"],
};

const TRAFFIC_TIMELINE = [
  { time: "18:05", rps: 10 },
  { time: "18:06", rps: 1 },
  { time: "18:07", rps: 2 },
  { time: "18:08", rps: 4 },
  { time: "18:09", rps: 12 }, // attack spike
  { time: "18:10", rps: 9 },
  { time: "18:11", rps: 6 },
];

function useThreatData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(MOCK_THREAT_DATA);
    }, 1500); // loader delay

    return () => clearTimeout(timer);
  }, []);

  return data;
}

export const TrafficDashboard = () => {
  const data = useThreatData();

  if (!data) return <HackerLoader />;

  return (
    <div className="min-h-screen bg-[#020204] text-green-400 font-mono p-6">
      <div className="flex justify-between mb-6">
        <h1 className="tracking-widest">BLACKHOLE :: LIVE THREAT MONITOR</h1>
        <span className="text-red-500 animate-pulse">
          STATUS: {data.detection.status}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <Radar />
        </div>

        <div className="col-span-4 space-y-4">
          <StatBox title="TOTAL REQUESTS" value={data.traffic.totalRequests} />
          <StatBox
            title="REQ / SECOND"
            value={data.traffic.requestsPerSecond}
          />
          <StatBox title="BLOCKED IPS" value={data.blockedIPs.length} />
        </div>

        <div className="col-span-4">
          <IPPanel perIP={data.traffic.perIP} blockedIPs={data.blockedIPs} />
        </div>
      </div>

      {/* 🔥 TRAFFIC GRAPH */}
      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <TrafficTimeline data={TRAFFIC_TIMELINE} />
        </div>
      </div>

      <EndpointHeatMap endpoints={data.traffic.perEndpoint} />
      <AttackAlert detection={data.detection} />
    </div>
  );
};

function Radar() {
  return (
    <div className="relative aspect-square rounded-full border border-slate-700 overflow-hidden">
      <div
        className="absolute inset-0 
    bg-[radial-gradient(circle,rgba(148,163,184,0.15)_1px,transparent_1px)]
    bg-size-[18px_18px]"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        className="absolute inset-0 flex justify-center"
      >
        <div
          className="w-0.5 h-1/2 
      bg-linear-to-t from-cyan-400/80 to-transparent 
      origin-bottom"
        />
      </motion.div>

      {/* threat ping */}
      <motion.div
        className="absolute w-2 h-2 bg-red-400 rounded-full"
        style={{ top: "32%", left: "66%" }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
      />
    </div>
  );
}
function StatBox({ title, value }) {
  return (
    <div className="border border-green-500 p-4 rounded bg-black/40">
      <p className="text-xs tracking-widest">{title}</p>
      <p className="text-2xl mt-1">{value}</p>
    </div>
  );
}
function IPPanel({ perIP, blockedIPs }) {
  return (
    <div className="border border-slate-700 rounded-lg bg-slate-900/60 p-4">
      <p className="mb-3 tracking-widest text-slate-300">IP ACTIVITY</p>

      {Object.entries(perIP).map(([ip, data]) => (
        <div
          key={ip}
          className="border border-red-400/40 bg-red-400/10 p-3 rounded mb-2"
        >
          <p className="text-slate-200">IP: {ip}</p>
          <p className="text-slate-400">REQ: {data.count}</p>
          <p className="text-red-400">BLOCKED</p>
        </div>
      ))}
    </div>
  );
}
function EndpointHeatMap({ endpoints }) {
  return (
    <div className="mt-6 border border-green-500 p-4 rounded">
      <p className="mb-3 tracking-widest">ENDPOINT ACTIVITY</p>

      {Object.entries(endpoints).map(([ep, count]) => (
        <div key={ep} className="mb-2">
          <p className="text-xs">{ep}</p>
          <div
            className={`h-3 rounded ${
              ep === "/attack" ? "bg-red-400/80" : "bg-cyan-400/60"
            }`}
            style={{ width: `${count * 4}px` }}
          />
        </div>
      ))}
    </div>
  );
}
function AttackAlert({ detection }) {
  return (
    <div className="mt-6 border border-red-500 p-4 rounded bg-red-500/10">
      <p className="text-red-500 tracking-widest animate-pulse">
        ⚠ ATTACK DETECTED
      </p>
      <p>{detection.reason}</p>
      <p className="text-xs opacity-70">
        {new Date(detection.detectedAt).toLocaleString()}
      </p>
    </div>
  );
}

function TrafficTimeline({ data }) {
  return (
    <div className="relative h-64 rounded-xl bg-[#0b0d12] border border-white/5 overflow-hidden p-4">
      <h3 className="text-xs tracking-widest text-white/60 mb-2">
        REQUESTS OVER TIME
      </h3>

      {/* Graph */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" />
          <YAxis stroke="rgba(255,255,255,0.3)" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rps"
            stroke="#7dd3fc"
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 🔍 Sweep Overlay */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(125,211,252,0.15), transparent)",
        }}
        animate={{ x: ["-20%", "200%"] }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
