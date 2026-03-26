import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* TOP BAR */}
      <div className="flex items-center justify-between h-15 w-full py-5">
        <div className="font-bold tracking-wider text-3xl">Blackhole.</div>

        {/* BLACKHOLE BUTTON */}
        <div
          className="relative cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          {/* PLANET SLINGSHOT */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full
                           bg-linear-to-br from-yellow-400 to-orange-600
                           shadow-[0_0_15px_rgba(255,165,0,0.8)] z-50"
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ x: -170, y: 0, scale: 1 }}
                exit={{ x: 0, y: 0, scale: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />
            )}
          </AnimatePresence>

          {/* SVG BLACKHOLE */}
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 320 320"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ scale: open ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 200 }}
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
      </div>

      {/* NAVIGATION MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-6 top-20 flex gap-6
                       bg-black/60 backdrop-blur-md
                       border border-orange-500/40
                       px-6 py-3 rounded-lg z-40"
            initial={{ opacity: 0, y: -12, x: 30 }}
            animate={{ opacity: 1, y: -12, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <NavItem text="Home" value="/" />
            <NavItem text="About" value="/about" />
            <NavItem text="UrlScan" value="/phishingPage" />
            <NavItem text="Public Scan" value="/scans" />
            <NavItem text="Dashboard" value="/dashboard" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ text, value }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${value}`)}
      className="text-orange-400 hover:text-orange-300 cursor-pointer transition"
    >
      {text}
    </div>
  );
}

export default Navbar;

// import React, { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const menuItems = ["Dashboard", "Threats", "Scan", "About"];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const ejectSound = useRef(new Audio("/sounds/eject.mp3"));
//   const absorbSound = useRef(new Audio("/sounds/absorb.mp3"));

//   const toggle = () => {
//     if (!open) ejectSound.current.play();
//     else absorbSound.current.play();
//     setOpen(!open);
//   };

//   return (
//     <div className="relative">
//       {/* TOP BAR */}
//       <div className="flex items-center justify-between py-5">
//         <h1 className="text-2xl font-bold">Blackhole.</h1>

//         {/* BLACKHOLE BUTTON */}
//         <div className="relative cursor-pointer" onClick={toggle}>
//           {/* GRAVITATIONAL RIPPLE */}
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="absolute inset-0 rounded-full border border-orange-400"
//                 initial={{ scale: 0.6, opacity: 0.8 }}
//                 animate={{ scale: 1.6, opacity: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//               />
//             )}
//           </AnimatePresence>

//           {/* PLANET CURVED ORBIT */}
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-yellow-300 to-orange-600 shadow-lg"
//                 initial={{ offsetDistance: "0%" }}
//                 animate={{ offsetDistance: "100%" }}
//                 exit={{ offsetDistance: "0%" }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 style={{
//                   offsetPath: "path('M0,0 C-40,-60 -80,-20 -120,-40')",
//                   offsetRotate: "auto",
//                 }}
//               />
//             )}
//           </AnimatePresence>

//           {/* PARTICLE DEBRIS */}
//           <AnimatePresence>
//             {open &&
//               [...Array(6)].map((_, i) => (
//                 <motion.span
//                   key={i}
//                   className="absolute w-1 h-1 bg-orange-400 rounded-full"
//                   initial={{ x: 0, y: 0, opacity: 1 }}
//                   animate={{
//                     x: Math.random() * 60 - 30,
//                     y: Math.random() * 60 - 30,
//                     opacity: 0,
//                   }}
//                   transition={{ duration: 0.6 }}
//                 />
//               ))}
//           </AnimatePresence>

//           {/* BLACKHOLE SVG */}
//           <motion.svg
//             width="60"
//             height="60"
//             viewBox="0 0 320 320"
//             animate={{ rotate: open ? 180 : 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <circle cx="160" cy="160" r="60" fill="#000" />
//             <ellipse
//               cx="160"
//               cy="160"
//               rx="110"
//               ry="40"
//               stroke="#ff7a18"
//               strokeWidth="6"
//               fill="none"
//             >
//               <animateTransform
//                 attributeName="transform"
//                 type="rotate"
//                 from="0 160 160"
//                 to="360 160 160"
//                 dur="6s"
//                 repeatCount="indefinite"
//               />
//             </ellipse>
//           </motion.svg>
//         </div>
//       </div>

//       {/* MENU ITEMS FLY FROM ORBIT */}
//       <AnimatePresence>
//         {open && (
//           <div className="absolute right-6 top-20 flex gap-6">
//             {menuItems.map((item, i) => (
//               <motion.div
//                 key={item}
//                 className="px-4 py-2 text-orange-400 border border-orange-500/40 rounded-md bg-black/50"
//                 initial={{ x: -30, y: -20, opacity: 0 }}
//                 animate={{ x: 0, y: 0, opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 {item}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
