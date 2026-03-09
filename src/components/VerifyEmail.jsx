import React, { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // States for our verification process: 'loading', 'success', 'error'
  const [verificationStatus, setVerificationStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  const token = searchParams.get("token");

  // Initialize Particles (Same theme background)
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    // Agar URL mein token nahi hai
    if (!token) {
      setVerificationStatus("error");
      setMessage("Invalid or missing verification link.");
      return;
    }

    // Yahan aapki actual Backend API call aayegi (e.g., axios.post('/api/verify-email', { token }))
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-email",
          { token },
        );

        if (response.data.success) {
          setVerificationStatus("success");
          setMessage("Email verified successfully! Welcome aboard.");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification link has expired or is invalid.",
        );
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden font-sans py-10">
      {/* 1. Particle.js Node Connection Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#fdba74" },
            links: {
              color: "#94a3b8",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true, area: 600 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* 2. Verification Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl text-center"
      >
        {/* Animated Blackhole / Status Icon */}
        <div className="flex justify-center mb-6">
          {verificationStatus === "loading" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative w-20 h-20"
            >
              {/* Spinning Blackhole for loading state */}
              <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="40%" stopColor="#000000" />
                    <stop offset="65%" stopColor="#ff6a00" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <filter id="blur">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>
                <circle
                  cx="160"
                  cy="160"
                  r="135"
                  fill="url(#glow)"
                  filter="url(#blur)"
                />
                <ellipse
                  cx="160"
                  cy="160"
                  rx="105"
                  ry="48"
                  fill="none"
                  stroke="#ff7a18"
                  strokeWidth="6"
                  strokeDasharray="20, 10"
                />
                <circle cx="160" cy="160" r="60" fill="#000" />
              </svg>
            </motion.div>
          )}

          {verificationStatus === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}

          {verificationStatus === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
            >
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Status Headings & Messages */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">
          {verificationStatus === "loading" && "Authenticating..."}
          {verificationStatus === "success" && "Verification Complete"}
          {verificationStatus === "error" && "Verification Failed"}
        </h1>

        <p
          className={`text-sm mb-8 ${
            verificationStatus === "success"
              ? "text-green-400"
              : verificationStatus === "error"
                ? "text-red-400"
                : "text-orange-400"
          }`}
        >
          {message}
        </p>

        {/* Action Buttons */}
        {verificationStatus === "success" && (
          <p className="text-xs text-slate-500 animate-pulse">
            Redirecting to login automatically...
          </p>
        )}

        {verificationStatus === "error" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all"
          >
            Back to Login
          </button>
        )}
      </motion.div>
    </div>
  );
}
