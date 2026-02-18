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
  email: "alex@cybersentinel.com", // Added Email
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
  { day: "M", value: 40 },
  { day: "T", value: 70 },
  { day: "W", value: 50 },
  { day: "T", value: 90 },
  { day: "F", value: 60 },
  { day: "S", value: 30 },
  { day: "S", value: 45 },
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

// 1. UPDATED EDIT PROFILE MODAL (Ab Har Cheez Editable Hai)
const EditProfileModal = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleSkillChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(",").map((s) => s.trim()),
    });
  };

  // Profile Image Upload Handler (Simulation)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Edit3 size={20} className="text-indigo-600" /> Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-6 overflow-y-auto">
          {/* 1. Avatar Update */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative group cursor-pointer w-24 h-24">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
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
              <p className="text-xs text-gray-500 mt-1 mb-2">
                Click the image to upload a new one.
              </p>
              <label
                htmlFor="avatar-upload"
                className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Upload New
              </label>
            </div>
          </div>

          {/* 2. Personal Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400 font-bold">
                  @
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-8 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Role / Title
              </label>
              <div className="relative">
                <Briefcase
                  size={16}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Location
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Website
              </label>
              <div className="relative">
                <Globe
                  size={16}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
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
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
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
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-200"
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
  const fullText = `> ESTABLISHING SECURE CONNECTION...
> IDENTITY: ${data.username}
> TARGET: ${data.name}
> ROLE: ${data.role}
> ORG: ${data.company}
> LOC: ${data.location}
>
> DECRYPTING BIO...
> "${data.bio}"
>
> ANALYSIS COMPLETE.
> SKILLS: [${data.skills.join(", ")}]
>
> READY FOR COMMAND._`;

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

// 3. RADAR CHART
const SkillRadar = () => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = center + radius * (value / 100) * Math.cos(angle);
    const y = center + radius * (value / 100) * Math.sin(angle);
    return `${x},${y}`;
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
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {[25, 50, 75].map((tick) => (
          <polygon
            key={tick}
            points={SKILL_RADAR_DATA.map((d, i) =>
              getPoint(tick, i, SKILL_RADAR_DATA.length),
            ).join(" ")}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          points={polyPoints}
          fill="rgba(99, 102, 241, 0.2)"
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

// 4. SHARE CARD
const ShareCardModal = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.9, rotateX: 20 }}
          animate={{ scale: 1, rotateX: 0 }}
          className="bg-white w-85 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <div className="h-32 bg-linear-to-tr from-violet-600 via-indigo-500 to-cyan-400"></div>
          <div className="px-6 pb-8 text-center relative">
            <div className="w-24 h-24 mx-auto -mt-12 rounded-full border-4 border-white shadow-lg bg-white p-1">
              <img
                src={data.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-3">
              {data.name}
            </h2>
            <p className="text-sm text-gray-500 font-medium">{data.role}</p>
            <div className="my-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
              <QrCode size={120} className="text-gray-800" />
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                Scan to Connect
              </p>
            </div>
          </div>
        </motion.div>
        <button
          onClick={onClose}
          className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 backdrop-blur"
        >
          <X size={24} />
        </button>
      </div>
    </motion.div>
  );
};

// 5. MOOD PICKER
const MoodPicker = ({ currentMood, setMood }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute bottom-0 right-0">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-xl p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer z-10 relative"
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
              className="absolute top-12 left-0 z-20 bg-white p-2 rounded-xl shadow-xl border border-gray-100 w-40 flex flex-col gap-1"
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
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 text-left transition-colors"
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

// 6. STAT CARD
const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
        {label}
      </p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className={`p-2 rounded-lg ${color}`}>
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

  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans">
      <AnimatePresence>
        {isEditing && (
          <EditProfileModal
            data={userData}
            onClose={() => setIsEditing(false)}
            onSave={handleSaveProfile}
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

      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="h-32 bg-linear-to-r from-gray-100 via-slate-200 to-indigo-100 relative">
            <div className="absolute right-6 top-6 flex gap-3">
              <button
                onClick={() => setIsHackerMode(true)}
                className="bg-black/80 backdrop-blur text-green-400 px-3 py-2 rounded-lg text-sm font-bold font-mono flex items-center gap-2 hover:bg-black transition-colors border border-green-900 shadow-xl"
              >
                <Code size={16} />
              </button>
              <button
                onClick={() => setIsSharing(true)}
                className="bg-white/80 backdrop-blur text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white transition-colors"
              >
                <Share2 size={16} /> Share Profile
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative -mt-12">
                <div className="w-32 h-32 rounded-3xl bg-gray-900 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-white text-4xl font-bold p-1">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <MoodPicker currentMood={mood} setMood={setMood} />
              </div>
              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {userData.name}
                    </h1>
                    <p className="text-gray-500 font-medium">
                      {userData.role} at{" "}
                      <span className="text-gray-900">{userData.company}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all">
                      <Download size={16} /> Download Resume
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
                  {userData.bio}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />{" "}
                    {userData.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />{" "}
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-gray-400" />{" "}
                    {userData.website}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-md border border-gray-200"
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
              label="Total Scans Performed"
              value={userData.stats.scans}
              icon={Terminal}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Vulnerabilities Found"
              value={userData.stats.issuesFixed}
              icon={AlertCircle}
              color="bg-red-50 text-red-600"
            />
            <StatCard
              label="Platform Reputation"
              value={userData.stats.reputation}
              icon={Shield}
              color="bg-emerald-50 text-emerald-600"
            />
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-80 relative">
            <div className="flex justify-between items-start mb-2 z-10">
              <div>
                <h3 className="font-bold text-gray-900">Performance Metrics</h3>
                <p className="text-sm text-gray-500">
                  {showRadar
                    ? "Skill Balance Matrix"
                    : "Weekly Activity Consistency"}
                </p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setShowRadar(false)}
                  className={`p-1.5 rounded-md transition-all ${!showRadar ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <BarChart3 size={16} />
                </button>
                <button
                  onClick={() => setShowRadar(true)}
                  className={`p-1.5 rounded-md transition-all ${showRadar ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Radar size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-center w-full relative">
              <AnimatePresence mode="wait">
                {!showRadar ? (
                  <motion.div
                    key="bar-chart"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-end justify-between w-full h-48 gap-4 px-2"
                  >
                    {ACTIVITY_DATA.map((item, i) => (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden group-hover:bg-indigo-100 transition-colors h-45 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.value}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="w-full bg-gray-900 opacity-90 group-hover:bg-indigo-600 transition-colors"
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-indigo-600">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="radar-chart"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center pb-4"
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
            <h3 className="font-bold text-lg text-gray-900">
              Recent Scan History
            </h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">
              View Full Log
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {SCAN_HISTORY.map((scan) => (
                <motion.div
                  key={scan.id}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 transition-colors cursor-pointer group"
                >
                  <div
                    className={`p-2 rounded-lg w-fit ${scan.status === "Clean" ? "bg-green-100 text-green-600" : scan.status === "Flagged" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}
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
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {scan.target}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${scan.risk === "High" ? "bg-red-50 text-red-600 border-red-100" : scan.risk === "Medium" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-green-50 text-green-600 border-green-100"}`}
                      >
                        {scan.risk.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Cpu size={14} /> {scan.method}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400 md:pl-10">
                    <span className="hidden md:flex items-center gap-1">
                      <Calendar size={14} /> {scan.time}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-900 font-medium text-xs bg-gray-100 px-3 py-1.5 rounded-lg transition-all hover:bg-gray-200">
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
