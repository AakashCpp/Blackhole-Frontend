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
  Github,
  Linkedin,
  Instagram,
  Code2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  fetchStats,
  updateProfile,
  resetStatus,
} from "../redux/slices/userSlice";

const MOODS = [
  { icon: "💻", label: "Deep Work" },
  { icon: "⚡", label: "Energetic" },
  { icon: "☕", label: "Breather" },
  { icon: "🐛", label: "Debugging" },
  { icon: "🎯", label: "Focused" },
];

// --- COMPONENTS ---

// 1. GLASSMORPHISM EDIT PROFILE MODAL
const EditProfileModal = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...data,
    urls: data?.urls || {
      website: "",
      github: "",
      linkedin: "",
      leetcode: "",
      instagram: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSkillChange = (e) =>
    setFormData({
      ...formData,
      skills: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean), // Added filter to remove empty strings
    });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSocialChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      urls: { ...prev.urls, [platform]: value },
    }));
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
                src={
                  formData.profilePicture ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber"
                }
                alt="Avatar"
                crossOrigin="anonymous"
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
              {
                label: "Full Name",
                icon: User,
                key: "name",
                type: "text",
                disabled: true,
              },
              {
                label: "Username",
                icon: () => (
                  <span className="absolute left-3 top-3.5 text-gray-400 font-bold">
                    @
                  </span>
                ),
                key: "username",
                type: "text",
                disabled: false,
              },
              {
                label: "Role / Title",
                icon: Briefcase,
                key: "role",
                type: "text",
                disabled: false,
              },
              {
                label: "Email",
                icon: Mail,
                key: "email",
                type: "email",
                disabled: true,
              },
              {
                label: "Location",
                icon: MapPin,
                key: "location",
                type: "text",
                disabled: false,
              },
              {
                label: "Organization",
                icon: Globe,
                key: "company",
                type: "text",
                disabled: false,
              },
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
                    value={formData[field.key] || ""}
                    disabled={field.disabled}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className={`w-full pl-10 p-3 rounded-xl border border-white/60 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${field.disabled ? "bg-white/20 text-gray-500 opacity-60 cursor-not-allowed" : "bg-white/40 focus:bg-white/80 focus:border-indigo-400 text-gray-900"}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/40">
            <h3 className="text-sm font-extrabold text-gray-900 mb-4 uppercase tracking-wider">
              Social Profiles & URLs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  label: "Website",
                  icon: LinkIcon,
                  key: "website",
                  placeholder: "https://yourwebsite.com",
                },
                {
                  label: "GitHub URL",
                  icon: Github,
                  key: "github",
                  placeholder: "https://github.com/...",
                },
                {
                  label: "LinkedIn URL",
                  icon: Linkedin,
                  key: "linkedin",
                  placeholder: "https://linkedin.com/in/...",
                },
                {
                  label: "LeetCode URL",
                  icon: Code2,
                  key: "leetcode",
                  placeholder: "https://leetcode.com/u/...",
                },
                {
                  label: "Instagram URL",
                  icon: Instagram,
                  key: "instagram",
                  placeholder: "https://instagram.com/...",
                },
              ].map((social) => (
                <div key={social.key} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {social.label}
                  </label>
                  <div className="relative">
                    <social.icon
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                    <input
                      type="url"
                      placeholder={social.placeholder}
                      value={formData.urls?.[social.key] || ""}
                      onChange={(e) =>
                        handleSocialChange(social.key, e.target.value)
                      }
                      className="w-full pl-10 p-3 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-white/40">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Description (Bio)
            </label>
            <textarea
              rows={3}
              value={formData.bio || formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-gray-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Skills (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills?.join(", ") || ""}
              onChange={handleSkillChange}
              className="w-full p-3 pl-4 rounded-xl border border-white/60 bg-white/40 focus:bg-white/80 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-900"
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
            onClick={() => onSave(formData, selectedFile)}
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
  const fullText = `> ESTABLISHING SECURE CONNECTION...\n> IDENTITY: ${
    data?.username || "UNKNOWN"
  }\n> TARGET: ${data?.name || "UNKNOWN"}\n> ROLE: ${
    data?.role || "UNASSIGNED"
  }\n> ORG: ${data?.company || data?.org || "NONE"}\n> LOC: ${
    data?.location || "UNKNOWN"
  }\n>\n> DECRYPTING BIO...\n> "${
    data?.bio || data?.description || ""
  }"\n>\n> ANALYSIS COMPLETE.\n> SKILLS: [${
    data?.skills?.join(", ") || ""
  }]\n>\n> READY FOR COMMAND._`;

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

// 3. SPIDER/RADAR CHART (DYNAMIC)
const SkillRadar = ({ skills }) => {
  const size = 200,
    center = size / 2,
    radius = 80;

  // Transform string skills to radar data dynamically
  const radarData =
    skills && skills.length > 0
      ? skills.map((skill) => ({ subject: skill.substring(0, 10), A: 85 })) // Defaulting to 85 score for display
      : [
          { subject: "No Skills", A: 0 },
          { subject: "Added", A: 0 },
          { subject: "Yet", A: 0 },
        ];

  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return `${
      center + radius * (value / 100) * Math.cos(angle)
    },${center + radius * (value / 100) * Math.sin(angle)}`;
  };

  const polyPoints = radarData
    .map((d, i) => getPoint(d.A, i, radarData.length))
    .join(" ");
  const bgPoints = radarData
    .map((d, i) => getPoint(100, i, radarData.length))
    .join(" ");

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
            points={radarData
              .map((d, i) => getPoint(tick, i, radarData.length))
              .join(" ")}
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
        {radarData.map((d, i) => {
          const [x, y] = getPoint(115, i, radarData.length).split(",");
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

// 4. MOUNTAIN GRAPH (AREA CHART - DYNAMIC)
const MountainGraph = ({ dailyActivity }) => {
  // Use backend data or default empty structure
  const safeActivity =
    dailyActivity && dailyActivity.length >= 2
      ? dailyActivity
      : [
          { date: "Mon", count: 0 },
          { date: "Tue", count: 0 },
          { date: "Wed", count: 0 },
          { date: "Thu", count: 0 },
          { date: "Fri", count: 0 },
          { date: "Sat", count: 0 },
          { date: "Sun", count: 0 },
        ];

  const maxVal = Math.max(...safeActivity.map((d) => d.count), 10); // Minimum scale of 10

  const points = safeActivity.map((d, i) => {
    const x = (i / (safeActivity.length - 1)) * 100;
    const y = 100 - (d.count / maxVal) * 100;
    return `${x},${y}`;
  });

  const pathString = `M 0,100 L 0,${
    100 - (safeActivity[0]?.count || 0)
  } L ${points.join(" L ")} L 100,100 Z`;
  const lineString = `M 0,${
    100 - (safeActivity[0]?.count || 0)
  } L ${points.join(" L ")}`;

  return (
    <div className="w-full h-full flex flex-col pt-2">
      <div className="flex-1 relative w-full min-h-0 mt-2">
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
        {points.map((p, i) => {
          const [x, y] = p.split(",");
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white border-[1.5px] border-indigo-500 rounded-full z-10 shadow-sm"
              style={{ left: `${x}%`, top: `${y}%`, x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-end mt-2 px-1">
        {safeActivity.map((d, i) => {
          // Display day name or last few chars of date
          const label =
            d.date.length > 3 ? d.date.substring(d.date.length - 5) : d.date;
          return (
            <span
              key={i}
              className="text-[10px] font-bold text-gray-400 uppercase"
            >
              {label}
            </span>
          );
        })}
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
              src={
                data?.profilePicture ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber"
              }
              alt="Profile"
              crossOrigin="anonymous"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{data?.name}</h2>
          <p className="text-sm text-gray-500 font-medium">{data?.role}</p>
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, stats, loading, error, success } = useSelector(
    (state) => state.user,
  );

  const [mood, setMood] = useState(MOODS[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [showRadar, setShowRadar] = useState(false);

  // FETCH DATA FROM API
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Profile updated successfully!");
      dispatch(resetStatus());
    }
  }, [success, dispatch]);

  // SAVE DATA USING FormData
  const handleSaveProfile = (updatedData, selectedFile) => {
    const formDataToSend = new FormData();

    formDataToSend.append("username", updatedData.username || "");
    formDataToSend.append("role", updatedData.role || "");
    formDataToSend.append("company", updatedData.company || "");
    formDataToSend.append("location", updatedData.location || "");
    formDataToSend.append("bio", updatedData.bio || "");

    if (updatedData.skills && updatedData.skills.length > 0) {
      formDataToSend.append("skills", updatedData.skills.join(","));
    }

    if (updatedData.urls) {
      formDataToSend.append("urls", JSON.stringify(updatedData.urls));
    }

    if (selectedFile) {
      formDataToSend.append("profilePicture", selectedFile);
    }

    dispatch(updateProfile(formDataToSend));
    setIsEditing(false);
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-600 font-medium">
          Decrypting Profile Data...
        </p>
      </div>
    );
  }

  // --- THE FIX: Declare userData object based on our Redux state
  const userData = {
    ...profile?.data,
    ...stats?.data,
  };

  console.log(userData);

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
                className="bg-black/80 backdrop-blur text-green-400 px-3 py-2 rounded-xl text-sm font-bold font-mono flex items-center gap-2 hover:bg-black transition-colors shadow-lg"
              >
                <Code size={16} />
              </button>
              <button
                onClick={() => setIsSharing(true)}
                className="bg-white/80 backdrop-blur text-gray-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white transition-colors shadow-sm"
              >
                <Share2 size={16} />{" "}
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg"
              >
                <Edit3 size={16} />{" "}
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            </div>
          </div>
          <div className="px-4 sm:px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative -mt-12 mx-auto md:mx-0">
                <div className="w-32 h-32 rounded-3xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={
                      userData.profilePicture ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber"
                    }
                    alt="Profile"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover rounded-2xl bg-gray-50"
                  />
                </div>
                <MoodPicker currentMood={mood} setMood={setMood} />
              </div>
              <div className="flex-1 pt-4 text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      {userData.name}
                      <p className="text-sm text-zinc-700 mt-1">
                        {userData.username}
                      </p>
                    </h1>
                    <p className="text-gray-500 font-bold mt-2">
                      {userData.role} {userData.org && `at `}{" "}
                      <span className="text-gray-900">{userData.org}</span>
                    </p>
                  </div>
                  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-all active:scale-95">
                    <Download size={16} /> Resume
                  </button>
                </div>
                <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed font-medium mx-auto md:mx-0">
                  {userData.bio}
                </p>

                {/* --- LOCATION, CLICKABLE EMAIL, AND CLICKABLE WEBSITE --- */}
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 font-semibold">
                  {userData.location && (
                    <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm">
                      <MapPin size={16} className="text-indigo-500" />{" "}
                      {userData.location}
                    </div>
                  )}
                  {userData.email && (
                    <a
                      href={`mailto:${userData.email}`}
                      className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm hover:bg-white hover:text-indigo-600 transition-all cursor-pointer"
                    >
                      <Mail size={16} className="text-indigo-500" />{" "}
                      {userData.email}
                    </a>
                  )}
                  {userData.urls?.website && (
                    <a
                      href={
                        userData.urls.website.startsWith("http")
                          ? userData.urls.website
                          : `https://${userData.urls.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm hover:bg-white hover:text-indigo-600 transition-all cursor-pointer"
                    >
                      <LinkIcon size={16} className="text-indigo-500" />{" "}
                      {userData.urls.website}
                    </a>
                  )}
                </div>

                {/* --- SOCIAL LINKS BADGES --- */}
                {userData.urls && (
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                    {userData.urls.github && (
                      <a
                        href={userData.urls.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/60 rounded-xl border border-white/80 shadow-sm hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all text-gray-700 hover:text-black"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {userData.urls.linkedin && (
                      <a
                        href={userData.urls.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/60 rounded-xl border border-white/80 shadow-sm hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all text-gray-700 hover:text-blue-700"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {userData.urls.leetcode && (
                      <a
                        href={userData.urls.leetcode}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/60 rounded-xl border border-white/80 shadow-sm hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all text-gray-700 hover:text-amber-600"
                      >
                        <Code2 size={18} />
                      </a>
                    )}
                    {userData.urls.instagram && (
                      <a
                        href={userData.urls.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/60 rounded-xl border border-white/80 shadow-sm hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all text-gray-700 hover:text-rose-600"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {userData.skills && userData.skills.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/40">
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 text-center md:text-left">
                  Core Technologies
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
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
            )}
          </div>
        </motion.div>

        {/* SECTION 2: STATS & GRAPH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <StatCard
              label="Total Scans"
              value={userData?.totalJobs || 0}
              icon={Terminal}
              color="text-indigo-600"
            />
            <StatCard
              label="Issues Fixed"
              value={userData.stats?.issuesFixed || 0}
              icon={AlertCircle}
              color="text-rose-600"
            />
            <StatCard
              label="Reputation"
              value={userData.stats?.reputation || "Newbie"}
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
                  className={`p-2 rounded-lg transition-all ${
                    !showRadar
                      ? "bg-white shadow text-indigo-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <BarChart3 size={16} />
                </button>
                <button
                  onClick={() => setShowRadar(true)}
                  className={`p-2 rounded-lg transition-all ${
                    showRadar
                      ? "bg-white shadow text-indigo-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Radar size={16} />
                </button>
              </div>
            </div>
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
                    <MountainGraph
                      dailyActivity={userData?.performanceMatrix?.slice(-10)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="radar-chart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <SkillRadar skills={userData.skills} />
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
              {userData.jobs && userData.jobs.length > 0 ? (
                userData.jobs.map((job, index) => (
                  <motion.div
                    key={job._id || index}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    className="p-5 flex flex-col md:flex-row md:items-center gap-4 transition-colors cursor-pointer group"
                  >
                    <div
                      className={`p-3 rounded-xl shadow-sm border border-white/60 ${
                        job.status === "Clean"
                          ? "bg-emerald-50 text-emerald-600"
                          : job.status === "Flagged"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {job.status === "Clean" ? (
                        <CheckCircle2 size={20} />
                      ) : job.status === "Flagged" ? (
                        <AlertCircle size={20} />
                      ) : (
                        <Activity size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {job.target || `Project Target #${index + 1}`}
                        </h4>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${
                            job.risk === "High"
                              ? "bg-rose-50/50 text-rose-600 border-rose-200"
                              : job.risk === "Medium"
                                ? "bg-amber-50/50 text-amber-600 border-amber-200"
                                : "bg-emerald-50/50 text-emerald-600 border-emerald-200"
                          }`}
                        >
                          {(job.risk || "Normal").toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                        <Cpu size={14} />{" "}
                        {job.method || "Automated Vulnerability Scan"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 text-sm font-bold text-gray-400 md:pl-10">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={16} />{" "}
                        {job.time || new Date().toLocaleDateString()}
                      </span>
                      <button
                        onClick={() =>
                          navigate(
                            `/scan-details/${job.type || "vuln"}/${job._id}`,
                          )
                        }
                        className="opacity-100 md:opacity-0 group-hover:opacity-100 text-indigo-600 font-bold text-xs bg-white border border-white shadow-sm px-4 py-2 rounded-xl transition-all hover:shadow-md"
                      >
                        View Report
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 font-medium">
                  No recent scans found. Start your first scan!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
