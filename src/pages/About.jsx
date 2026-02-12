import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function About() {
  const [isHovering, setIsHovering] = useState(false);
  const services = [
    {
      title: "AI Threat Detection",
      img: "/images/ai-threat.png",
    },
    {
      title: "Blockchain Security",
      img: "/images/blockchain.png",
    },
    {
      title: "Web3 Audits",
      img: "/images/web3.png",
    },
    {
      title: "Dark Web Monitoring",
      img: "/images/darkweb.png",
    },
    {
      title: "Zero Trust Systems",
      img: "/images/zerotrust.png",
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="h-full w-full py-10">
          <div className="h-96 w-full flex justify-between gap-10 p-4">
            <div className="h-full w-1/2">
              <div className="border-b border-zinc-500 w-1/2">
                <h1 className="font-bold tracking-wider text-4xl text-amber-100">
                  What is blackhole.
                </h1>
              </div>
              <p className="font-sm tracking-wide pt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
            </div>
            <div className="h-full w-1/2">
              <div className="border-b border-zinc-500">
                <h1 className="font-bold tracking-wider text-4xl text-amber-100">
                  Why blackhole is used for.
                </h1>
              </div>
              <p className="font-sm tracking-wide pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi sapiente fuga dolorum inventore iste cupiditate, fugit
                beatae veniam ex, ut, quidem voluptatibus hic aliquam nisi omnis
                est. Assumenda consequatur veritatis inventore quod delectus
                unde, minus non voluptatibus odio veniam! Deserunt?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi sapiente fuga dolorum inventore iste cupiditate, fugit
                beatae veniam ex, ut, quidem voluptatibus hic aliquam nisi omnis
                est. Assumenda consequatur veritatis inventore quod delectus
                unde, minus non voluptatibus odio veniam! Deserunt?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative w-full overflow-hidden p-4 flex flex-col gap-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* TOP STRIP → LEFT */}
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: isHovering ? 40 : 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...services, ...services].map((item, index) => (
              <div
                key={`top-${index}`}
                className="px-6 py-3 border border-green-400/40 
                       rounded-full text-green-400 font-mono text-sm 
                       tracking-widest uppercase
                       hover:bg-green-400 hover:text-white
                       transition-all duration-300
                       shadow-[0_0_20px_rgba(0,255,150,0.35)]"
              >
                {item.title}
              </div>
            ))}
          </motion.div>

          {/* BOTTOM STRIP → RIGHT */}
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: isHovering ? 45 : 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...services, ...services].map((item, index) => (
              <div
                key={`bottom-${index}`}
                className="px-6 py-3 border border-green-400/30 
                       rounded-full text-green-400/80 font-mono text-sm 
                       tracking-widest uppercase
                       hover:bg-green-400 hover:text-black
                       transition-all duration-300
                       shadow-[0_0_15px_rgba(0,255,150,0.25)]"
              >
                {item.title}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-zinc-900"></div>
      <div className="relative min-h-96 w-full overflow-hidden bg-zinc-900 my-10">
        {/* bg-video layer */}
        <div className="absolute inset-0 z-0">
          <video
            src="/media/175323-853193719_medium.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* overlay layer */}
        <div className="absolute inset-0 z-10 bg-linear-to-l from-zinc-900 via-zinc-900/80 to-transparent" />

        {/* actual content */}
        <div className="relative z-20 p-6 text-white">
          <h1 className="text-4xl font-bold">The Team</h1>

          <p className="mt-4 text-zinc-300 max-w-xl">
            Our core team focuses on security, intelligence, and scalable
            systems.
          </p>

          <TeamAccordion />
        </div>
      </div>
    </>
  );
}

export default About;

function TeamAccordion() {
  const team = [
    {
      id: 0,
      name: "Aakash",
      role: "Security Architect",
      bio: "Focuses on system-level threat modeling and zero trust architectures.",
    },
    {
      id: 1,
      name: "Rohan",
      role: "ML Engineer",
      bio: "Builds phishing detection and anomaly detection models.",
    },
    {
      id: 2,
      name: "Neha",
      role: "Product Engineer",
      bio: "Designs scalable dashboards and real-time monitoring systems.",
    },
  ];

  const [active, setActive] = useState(1); // content owner
  const [expanded, setExpanded] = useState(1); // layout owner
  const [next, setNext] = useState(null); // queued card

  const container = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.35,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const handleClick = (idx) => {
    if (idx === expanded) return;
    setNext(idx); // queue next
    setActive(null); // trigger exit
  };

  const handleExitComplete = () => {
    if (next !== null) {
      setExpanded(next); // collapse / expand
      setActive(next); // mount content
      setNext(null);
    }
  };

  return (
    <div className="flex h-72 gap-4 mt-10">
      {team.map((member, idx) => {
        const isExpanded = expanded === idx;
        const isActive = active === idx;

        return (
          <motion.div
            key={member.id}
            layout
            style={{ flex: isExpanded ? 3 : 1 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="relative rounded-xl bg-zinc-900 overflow-hidden cursor-pointer"
            onClick={() => handleClick(idx)}
          >
            {/* MINIMIZED STATE */}
            {!isExpanded && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* IMAGE */}
                {/* <motion.img
                  src={member.image}
                  alt={member.name}
                  className="absolute h-[85%] object-contain opacity-90"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                /> */}

                {/* DARK EDGE MASK */}
                <div
                  className="absolute inset-0 bg-linear-to-r 
                    from-zinc-900/80 via-transparent to-zinc-900/90"
                />

                {/* NAME TEXT */}
                <div className="relative z-10 flex flex-col">
                  {member.name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="text-zinc-300 font-mono text-lg tracking-widest"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVE CONTENT */}
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
              {isActive && (
                <motion.div
                  key="content"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full p-6 flex flex-col justify-center"
                >
                  <motion.h2
                    variants={item}
                    className="text-2xl font-bold text-amber-400"
                  >
                    {member.name}
                  </motion.h2>

                  <motion.h4
                    variants={item}
                    className="text-sm text-zinc-400 mt-1"
                  >
                    {member.role}
                  </motion.h4>

                  <motion.p
                    variants={item}
                    className="text-zinc-300 mt-4 max-w-sm leading-relaxed"
                  >
                    {member.bio}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
