import React, { useState, useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize Particles (Same theme background)
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    // Agar URL mein token nahi hai, toh error dikhao
    if (!token) {
      setError("Invalid or missing password reset token.");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Cannot reset password without a valid token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    // Simulate API call to backend (/api/reset-password)
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Password reset successfully for token:", token);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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

      {/* 2. Reset Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6">
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
            Create New Password
          </h1>
          <p className="mt-1 text-sm text-slate-400 text-center">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg text-center">
            {error}
          </div>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!token}
                  className="w-full pl-4 pr-10 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!token}
                  className="w-full pl-4 pr-10 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !token}
              className="relative w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg shadow-lg shadow-orange-900/20 transition-all disabled:opacity-70 flex justify-center items-center h-12 mt-4"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-slate-900/50 border border-green-500/30 rounded-lg"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <svg
                  className="w-6 h-6 text-green-400"
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
              </div>
            </div>
            <h3 className="text-lg font-medium text-slate-200 mb-2">
              Password Reset Successful
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              You can now use your new password to log in to your account.
            </p>
            <p className="text-xs text-slate-500 animate-pulse">
              Redirecting to login...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
