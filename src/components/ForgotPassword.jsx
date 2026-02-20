import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Navigation ke liye

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Ye track karega ki email bheja ya nahi
  const navigate = useNavigate();

  // Initialize Particles (Same theme background)
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to backend (/api/forgot-password)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true); // Email bhej diya!
      console.log("Reset link sent to:", email);
    }, 2000);
  };

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
            color: { value: "#fdba74" }, // Subtle warm orange for nodes
            links: {
              color: "#94a3b8", // Slate color for connections
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

      {/* 2. Forgot Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6">
          {/* Simple Static Orange Blackhole SVG */}
          <div className="mb-2">
            <motion.svg
              width="50"
              height="50"
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-pointer"
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="40%" stopColor="#000000" />
                  <stop offset="65%" stopColor="#ff6a00" />
                  <stop offset="85%" stopColor="#ffae42" />
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
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 160 160"
                  to="360 160 160"
                  dur="10s"
                  repeatCount="indefinite"
                />
                <ellipse
                  cx="160"
                  cy="160"
                  rx="105"
                  ry="48"
                  fill="none"
                  stroke="#ff7a18"
                  strokeWidth="6"
                  opacity="0.95"
                />
              </g>
              <circle cx="160" cy="160" r="60" fill="#000" />
            </motion.svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-orange-400">
            Recover Account
          </h1>
          <p className="mt-1 text-sm text-slate-400 text-center">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Conditional Rendering: Show form OR success message */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg shadow-lg shadow-orange-900/20 transition-all disabled:opacity-70 flex justify-center items-center h-12"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-slate-900/50 border border-orange-500/30 rounded-lg"
          >
            <div className="flex justify-center mb-3">
              <svg
                className="w-12 h-12 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-200 mb-1">
              Check your inbox
            </h3>
            <p className="text-sm text-slate-400">
              We've sent a password reset link to{" "}
              <strong className="text-slate-300">{email}</strong>.
            </p>
          </motion.div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 transition-colors w-full"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
