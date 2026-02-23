import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
  Calendar,
  Download,
  Share2,
  Terminal,
  Cpu,
  Edit3,
  X,
  Save,
  Camera,
  QrCode,
  Code,
  Radar,
  BarChart3,
  User,
  Briefcase,
  Globe,
} from "lucide-react";

// --- MOCK DATA ---
const INITIAL_USER_DATA = {
  name: "Alex Sterling",
  username: "@alex_sec",
  email: "alex@cybersentinel.com",
  role: "Lead Penetration Tester",
  company: "CyberSentinel X",
  bio: "Security researcher specializing in web application security and automated vulnerability assessment. Building tools to make the web safer.",
  location: "Indore, India",
  website: "alex-portfolio.dev",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  skills: ["React", "Node.js", "Python", "OWASP ZAP", "Network Security"],
  stats: {
    scans: 142,
    issuesFixed: 89,
    reputation: "Top 1%",
  },
};

const MOODS = [
  { icon: "💻", label: "Deep Work" },
  { icon: "⚡", label: "Energetic" },
  { icon: "☕", label: "Breather" },
  { icon: "🐛", label: "Debugging" },
  { icon: "🎯", label: "Focused" },
];

const ACTIVITY_DATA = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 45 },
];

const SKILL_RADAR_DATA = [
  { subject: "Frontend", A: 80 },
  { subject: "Backend", A: 90 },
  { subject: "Security", A: 95 },
  { subject: "DevOps", A: 65 },
  { subject: "Design", A: 70 },
  { subject: "Testing", A: 85 },
];

const SCAN_HISTORY = [
  {
    id: 1,
    target: "production-api.service.com",
    method: "SQL Injection Scan",
    time: "2h ago",
    status: "Clean",
    risk: "Low",
  },
  {
    id: 2,
    target: "legacy-auth.internal.net",
    method: "XSS Vulnerability Check",
    time: "5h ago",
    status: "Flagged",
    risk: "High",
  },
  {
    id: 3,
    target: "payment-gateway.io",
    method: "Full Penetration Test",
    time: "1d ago",
    status: "Completed",
    risk: "Medium",
  },
  {
    id: 4,
    target: "user-dashboard.dev",
    method: "Network Port Scan",
    time: "2d ago",
    status: "Failed",
    risk: "N/A",
  },
];

// --- COMPONENTS ---

// 1. GLASSMORPHISM EDIT PROFILE MODAL
const EditProfileModal = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleSkillChange = (e) =>
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((s) => s.trim()),
    });
  const handleImageChange = (e) => {
    if (e.target.files[0])
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(e.target.files[0]),
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/70 backdrop-blur-2xl border border-white/50 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-white/40 flex justify-between items-center bg-white/30">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Edit3 size={20} className="text-indigo-600" /> Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-6 pb-6 border-b border-white/40">
            <div className="relative group cursor-pointer w-24 h-24">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full border-4 border-white/80 shadow-lg object-cover bg-gray-100"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="text-white" size={24} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Photo</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3">
                Click the image to upload a new one.
              </p>
              <label
                htmlFor="avatar-upload"
                className="bg-indigo-600/10 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-600/20 transition-colors cursor-pointer border border-indigo-200/50"
              >
                Upload New
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "Full Name", icon: User, key: "name", type: "text" },
              {
                label: "Username",
                icon: () => (
                  <span className="absolute left-3 top-3.5 text-gray-400 font-bold">
                    @
                  </span>
                ),
                key: "username",
                type: "text",
              },
              {
                label: "Role / Title",
                icon: Briefcase,
                key: "role",
                type: "text",
              },
              { label: "Email", icon: Mail, key: "email", type: "email" },
              {
                label: "Location",
                icon: MapPin,
                key: "location",
                type: "text",
              },
              { label: "Website", icon: Globe, key: "website", type: "text" },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {field.label}
                </label>
                <div className="relative">
                  {field.icon !== User &&
                  field.icon !== Briefcase &&
                  field.icon !== Mail &&
                  field.icon !== MapPin &&
                  field.icon !== Globe ? (
                    <field.icon />
                  ) : (
                    <field.icon
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                  )}
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full pl-10 p-3 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  />
                </div>
              </div>
            ))}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full p-3 pl-4 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Skills (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills.join(", ")}
              onChange={handleSkillChange}
              className="w-full p-3 pl-4 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>
        </div>
        <div className="p-6 border-t border-white/40 bg-white/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-white/60 border border-transparent hover:border-white/50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 2. HACKER MODE TERMINAL
const HackerTerminal = ({ data, onClose }) => {
  const [text, setText] = useState("");
  const fullText = `> ESTABLISHING SECURE CONNECTION...\n> IDENTITY: ${data.username}\n> TARGET: ${data.name}\n> ROLE: ${data.role}\n> ORG: ${data.company}\n> LOC: ${data.location}\n>\n> DECRYPTING BIO...\n> "${data.bio}"\n>\n> ANALYSIS COMPLETE.\n> SKILLS: [${data.skills.join(", ")}]\n>\n> READY FOR COMMAND._`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-100 bg-black text-green-500 font-mono p-4 md:p-10 overflow-hidden flex flex-col"
    >
      <div className="flex justify-between items-center mb-6 border-b border-green-800 pb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Terminal size={20} /> TERMINAL_ACCESS
        </h2>
        <button
          onClick={onClose}
          className="hover:bg-green-900/30 p-2 rounded text-green-400 border border-green-800 transition-colors"
        >
          EXIT_SYSTEM
        </button>
      </div>
      <div className="flex-1 overflow-auto space-y-4">
        <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {text}
        </div>
        <div className="mt-8 border border-green-900 p-4 rounded bg-green-950/10">
          <p className="text-xs text-green-700 mb-2">RAW_DATA_PACKET.json</p>
          <pre className="text-xs text-green-400 opacity-80 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

// 3. SPIDER/RADAR CHART
const SkillRadar = () => {
  const size = 200,
    center = size / 2,
    radius = 80;
  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return `${center + radius * (value / 100) * Math.cos(angle)},${center + radius * (value / 100) * Math.sin(angle)}`;
  };
  const polyPoints = SKILL_RADAR_DATA.map((d, i) =>
    getPoint(d.A, i, SKILL_RADAR_DATA.length),
  ).join(" ");
  const bgPoints = SKILL_RADAR_DATA.map((d, i) =>
    getPoint(100, i, SKILL_RADAR_DATA.length),
  ).join(" ");

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-62.5 overflow-visible"
      >
        <polygon
          points={bgPoints}
          fill="none"
          stroke="rgba(226, 232, 240, 0.5)"
          strokeWidth="1"
        />
        {[25, 50, 75].map((tick) => (
          <polygon
            key={tick}
            points={SKILL_RADAR_DATA.map((d, i) =>
              getPoint(tick, i, SKILL_RADAR_DATA.length),
            ).join(" ")}
            fill="none"
            stroke="rgba(241, 245, 249, 0.5)"
            strokeWidth="1"
          />
        ))}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          points={polyPoints}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        {SKILL_RADAR_DATA.map((d, i) => {
          const [x, y] = getPoint(115, i, SKILL_RADAR_DATA.length).split(",");
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-slate-500 font-bold uppercase"
            >
              {d.subject}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// 4. MOUNTAIN GRAPH (AREA CHART) - FIXED OVERFLOW
const MountainGraph = () => {
  const maxVal = 100;
  // Map data to coordinates (X: 0 to 100%, Y: 0 to 100% inverted)
  const points = ACTIVITY_DATA.map((d, i) => {
    const x = (i / (ACTIVITY_DATA.length - 1)) * 100;
    const y = 100 - (d.value / maxVal) * 100;
    return `${x},${y}`;
  });

  const pathString = `M 0,100 L 0,${100 - ACTIVITY_DATA[0].value} L ${points.join(" L ")} L 100,100 Z`;
  const lineString = `M 0,${100 - ACTIVITY_DATA[0].value} L ${points.join(" L ")}`;

  return (
    <div className="w-full h-full flex flex-col pt-2">
      <div className="flex-1 relative w-full min-h-0 mt-2">
        {/* Graph Paths (SVG) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.0)" />
            </linearGradient>
          </defs>
          <motion.path
            d={pathString}
            fill="url(#mountainGrad)"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d={lineString}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* HTML OVERLAYS FOR PERFECT CIRCULAR DOTS */}
        {points.map((p, i) => {
          const [x, y] = p.split(",");
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white border-[1.5px] border-indigo-500 rounded-full z-10 shadow-sm"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                x: "-50%", // Centers the dot directly over the coordinate
                y: "-50%", // Centers the dot directly over the coordinate
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          );
        })}
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between items-end mt-2 px-1">
        {ACTIVITY_DATA.map((d, i) => (
          <span
            key={i}
            className="text-[10px] font-bold text-gray-400 uppercase"
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
};

// 5. SHARE CARD
const ShareCardModal = ({ data, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        initial={{ scale: 0.9, rotateX: 20 }}
        animate={{ scale: 1, rotateX: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-white/50 w-85 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className="h-32 bg-linear-to-tr from-violet-600/80 via-indigo-500/80 to-cyan-400/80 backdrop-blur"></div>
        <div className="px-6 pb-8 text-center relative">
          <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white shadow-lg bg-white p-1">
            <img
              src={data.avatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{data.name}</h2>
          <p className="text-sm text-gray-500 font-medium">{data.role}</p>
          <div className="my-6 p-4 bg-white/50 backdrop-blur rounded-2xl border border-white/80 flex flex-col items-center justify-center shadow-inner">
            <QrCode size={120} className="text-gray-800" />
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
              Scan to Connect
            </p>
          </div>
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 backdrop-blur transition-all border border-white/30"
      >
        <X size={24} />
      </button>
    </div>
  </motion.div>
);

// 6. MOOD PICKER
const MoodPicker = ({ currentMood, setMood }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute bottom-0 right-0">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 backdrop-blur text-xl p-2 rounded-full shadow-lg border border-white/50 hover:bg-white transition-colors cursor-pointer z-10 relative"
      >
        {currentMood.icon}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-12 left-0 z-20 bg-white/90 backdrop-blur-xl p-2 rounded-xl shadow-xl border border-white/50 w-40 flex flex-col gap-1"
            >
              <p className="text-[10px] text-gray-400 font-bold px-2 py-1 uppercase">
                Current Mood
              </p>
              {MOODS.map((m) => (
                <button
                  key={m.label}
                  onClick={() => {
                    setMood(m);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-lg text-sm text-gray-700 text-left transition-colors"
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// 7. STAT CARD
const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white/60 backdrop-blur-xl p-5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-all flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
        {label}
      </p>
      <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
    </div>
    <div
      className={`p-2.5 rounded-xl bg-white/50 shadow-sm border border-white/60 ${color}`}
    >
      <Icon size={20} />
    </div>
  </div>
);

// --- MAIN PAGE ---
export default function ProfilePage() {
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [mood, setMood] = useState(MOODS[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [showRadar, setShowRadar] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen font-sans relative overflow-hidden p-4 md:p-8">
      {/* Ambient Glassmorphism Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[-10%] right-[-5%] w-100 h-100 bg-sky-300/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      ></div>

      <AnimatePresence>
        {isEditing && (
          <EditProfileModal
            data={userData}
            onClose={() => setIsEditing(false)}
            onSave={(d) => {
              setUserData(d);
              setIsEditing(false);
            }}
          />
        )}
        {isSharing && (
          <ShareCardModal data={userData} onClose={() => setIsSharing(false)} />
        )}
        {isHackerMode && (
          <HackerTerminal
            data={userData}
            onClose={() => setIsHackerMode(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-white/80"
        >
          <div className="h-32 bg-linear-to-r from-gray-100/50 via-slate-200/50 to-indigo-100/50 relative">
            <div className="absolute right-6 top-6 flex gap-3">
              <button
                onClick={() => setIsHackerMode(true)}
                className="bg-black/80 backdrop-blur text-green-400 px-3 py-2 rounded-xl text-sm font-bold font-mono flex items-center gap-2 hover:bg-black transition-colors border border-green-900 shadow-lg"
              >
                <Code size={16} />
              </button>
              <button
                onClick={() => setIsSharing(true)}
                className="bg-white/80 backdrop-blur text-gray-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-colors border border-white/50 shadow-sm"
              >
                <Share2 size={16} /> Share
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative -mt-12">
                <div className="w-32 h-32 rounded-3xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl bg-gray-50"
                  />
                </div>
                <MoodPicker currentMood={mood} setMood={setMood} />
              </div>
              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      {userData.name}
                      <p className="text-sm text-zinc-700">
                        {userData.username}
                      </p>
                    </h1>
                    <p className="text-gray-500 font-bold mt-1">
                      {userData.role} at{" "}
                      <span className="text-gray-900">{userData.company}</span>
                    </p>
                  </div>
                  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-all active:scale-95">
                    <Download size={16} /> Resume
                  </button>
                </div>
                <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed font-medium">
                  {userData.bio}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 font-semibold">
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm">
                    <MapPin size={16} className="text-indigo-500" />{" "}
                    {userData.location}
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm">
                    <Mail size={16} className="textindigo-500" />{" "}
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm">
                    <LinkIcon size={16} className="text-indigo-500" />{" "}
                    {userData.website}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/40">
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-indigo-50/50 backdrop-blur text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: STATS & GRAPH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <StatCard
              label="Total Scans"
              value={userData.stats.scans}
              icon={Terminal}
              color="text-indigo-600"
            />
            <StatCard
              label="Issues Fixed"
              value={userData.stats.issuesFixed}
              icon={AlertCircle}
              color="text-rose-600"
            />
            <StatCard
              label="Reputation"
              value={userData.stats.reputation}
              icon={Shield}
              color="text-emerald-600"
            />
          </div>

          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-80 relative">
            <div className="flex justify-between items-start mb-2 z-10">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">
                  Performance Metrics
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  {showRadar
                    ? "Skill Balance Matrix"
                    : "Weekly Activity Consistancy"}
                </p>
              </div>
              <div className="flex bg-white/50 p-1 rounded-xl border border-white/80 shadow-sm">
                <button
                  onClick={() => setShowRadar(false)}
                  className={`p-2 rounded-lg transition-all ${!showRadar ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <BarChart3 size={16} />
                </button>
                <button
                  onClick={() => setShowRadar(true)}
                  className={`p-2 rounded-lg transition-all ${showRadar ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Radar size={16} />
                </button>
              </div>
            </div>
            {/* Added min-h-0 here to ensure the graph respects this container's height bounds */}
            <div className="flex-1 w-full relative min-h-0">
              <AnimatePresence mode="wait">
                {!showRadar ? (
                  <motion.div
                    key="mountain-chart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <MountainGraph />
                  </motion.div>
                ) : (
                  <motion.div
                    key="radar-chart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <SkillRadar />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SECTION 3: HISTORY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-xl text-gray-900">
              Recent Scan History
            </h3>
            <button className="text-sm text-indigo-600 font-bold hover:underline">
              View Full Log
            </button>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="divide-y divide-white/40">
              {SCAN_HISTORY.map((scan) => (
                <motion.div
                  key={scan.id}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  className="p-5 flex flex-col md:flex-row md:items-center gap-4 transition-colors cursor-pointer group"
                >
                  <div
                    className={`p-3 rounded-xl shadow-sm border border-white/60 ${scan.status === "Clean" ? "bg-emerald-50 text-emerald-600" : scan.status === "Flagged" ? "bg-rose-50 text-rose-600" : "bg-gray-50 text-gray-500"}`}
                  >
                    {scan.status === "Clean" ? (
                      <CheckCircle2 size={20} />
                    ) : scan.status === "Flagged" ? (
                      <AlertCircle size={20} />
                    ) : (
                      <Activity size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {scan.target}
                      </h4>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${scan.risk === "High" ? "bg-rose-50/50 text-rose-600 border-rose-200" : scan.risk === "Medium" ? "bg-amber-50/50 text-amber-600 border-amber-200" : "bg-emerald-50/50 text-emerald-600 border-emerald-200"}`}
                      >
                        {scan.risk.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <Cpu size={14} /> {scan.method}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm font-bold text-gray-400 md:pl-10">
                    <span className="hidden md:flex items-center gap-1.5">
                      <Calendar size={16} /> {scan.time}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-indigo-600 font-bold text-xs bg-white border border-white shadow-sm px-4 py-2 rounded-xl transition-all hover:shadow-md">
                      View Report
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
