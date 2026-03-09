import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "./Profile";
import Scanners from "./Scanners";
import NetworkMap from "./NetworkMap";
import Analytics from "./Analytics";
import DashHistory from "../components/DashHistory";

import {
  User,
  ShieldCheck,
  Network,
  BarChart3,
  LogOut,
  ChevronLeft,
  Menu,
  Shell,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

/* ===== COLOR MAPS (TAILWIND SAFE) ===== */
const colorMap = {
  green: {
    text: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-500/10",
  },
  cyan: {
    text: "text-cyan-600",
    bg: "bg-cyan-500/10",
  },
  red: {
    text: "text-rose-600",
    bg: "bg-rose-500/10",
  },
  indigo: {
    text: "text-indigo-600",
    bg: "bg-indigo-500/10",
  },
};

/* ===== PREMIUM MOTION ===== */
const smooth = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

/* ===== SHARED VARIANTS ===== */
const slideFade = {
  hidden: (collapsed) => ({
    opacity: 0,
    x: collapsed ? -20 : 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: (collapsed) => ({
    opacity: 0,
    x: collapsed ? 20 : -20,
  }),
};

function Dashboard() {
  const admin = "SKY";
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("profile");

  const navItems = [
    { id: "profile", label: "Profile", icon: User, color: "green" },
    { id: "scanners", label: "Scanners", icon: ShieldCheck, color: "amber" },
    { id: "network", label: "Network Map", icon: Network, color: "cyan" },
    { id: "analytics", label: "Analytics", icon: BarChart3, color: "red" },
    { id: "scans", label: "Scans History", icon: BarChart3, color: "indigo" },
  ];

  const dispatch = useDispatch();

  return (
    <>
      <div className="relative min-h-screen bg-slate-100 overflow-hidden">
        {/* ===== BACKGROUND GLOW ===== */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.2),transparent_45%)]" />
        </div>

        <div className="flex min-h-screen">
          {/* ===== SIDEBAR ===== */}
          <motion.aside
            animate={{ width: collapsed ? 80 : 280 }}
            transition={smooth}
            className="sticky top-0 h-screen border-r border-slate-200 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <div className="h-full p-4 flex flex-col gap-4">
              {/* ===== HEADER ===== */}
              <div
                className={`h-12 flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } rounded-xl px-4 bg-linear-to-r from-sky-500 to-indigo-500 text-white shadow`}
              >
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      key="header"
                      custom={collapsed}
                      variants={slideFade}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={smooth}
                      className="flex items-center gap-2"
                    >
                      <User size={20} />
                      <span className="font-semibold">
                        Welcome <b>{admin}</b>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button onClick={() => setCollapsed(!collapsed)}>
                  {collapsed ? <Menu /> : <ChevronLeft />}
                </button>
              </div>

              {/* ===== STATS ===== */}
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.div
                    key="stats"
                    custom={collapsed}
                    variants={{
                      hidden: (c) => ({
                        opacity: 0,
                        y: c ? -20 : 20,
                      }),
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                      exit: (c) => ({
                        opacity: 0,
                        y: c ? 20 : -20,
                      }),
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ ...smooth, delay: 0.05 }}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <h2 className="mb-3 text-xs tracking-widest text-slate-500">
                      SYSTEM ACTIVITY
                    </h2>

                    <div className="mb-4 rounded-xl p-4 bg-amber-500/10 border border-amber-300">
                      <p className="text-xs text-amber-700">TOTAL SCANS</p>
                      <p className="text-3xl font-bold text-amber-600">2,438</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <MiniStat title="Today" value="128 🕧" color="cyan" />
                      <MiniStat title="Streak" value="12🔥" color="green" />
                      <MiniStat title="Max" value="38🚀" color="red" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ===== NAV ===== */}
              <div className="relative flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  const colors = colorMap[item.color];

                  return (
                    <motion.button
                      key={item.id}
                      layout
                      whileHover={{ x: 4 }}
                      transition={smooth}
                      onClick={() => setActive(item.id)}
                      className={`relative flex h-11 items-center gap-3 rounded-lg px-3
                      ${
                        isActive
                          ? colors.text
                          : "text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          transition={smooth}
                          className={`absolute inset-0 rounded-lg ${colors.bg}`}
                        />
                      )}

                      <Icon size={20} className="relative z-10" />

                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            key={item.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={smooth}
                            className="relative z-10 font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* ===== LOGOUT LANDING===== */}
              <motion.button
                whileHover={{ x: 4 }}
                transition={smooth}
                className="mt-auto flex h-11 items-center gap-3 rounded-lg px-3 text-violet-500 hover:bg-violet-500/10"
              >
                <Shell size={20} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={smooth}
                    >
                      Landing
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                transition={smooth}
                className=" flex h-11 items-center gap-3 rounded-lg px-3 text-rose-500 hover:bg-rose-500/10"
              >
                <LogOut size={20} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={smooth}
                      onClick={() => dispatch(logoutUser())}
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="flex-1 p-10 text-slate-700">
            {active === "profile" && <Profile />}
            {active === "scanners" && <Scanners />}
            {active === "network" && <NetworkMap />}
            {active === "analytics" && <Analytics />}
            {active === "scans" && <DashHistory />}
          </main>
        </div>
      </div>
    </>
  );
}

/* ===== MINI STAT ===== */
function MiniStat({ title, value, color }) {
  const colors = {
    cyan: "text-cyan-600",
    green: "text-emerald-600",
    red: "text-rose-600",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-lg border border-slate-200 bg-white p-3 text-center"
    >
      <p className="text-xs text-slate-500">{title}</p>
      <p className={`text-lg font-bold ${colors[color]}`}>{value}</p>
    </motion.div>
  );
}

export default Dashboard;
