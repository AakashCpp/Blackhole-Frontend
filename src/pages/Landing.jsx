import React, { useState, useRef } from "react";
import {
  HackerCLIBg,
  HackerBackground,
  CLITerminal,
  CThreatRadar,
  ThreatRadar,
} from "../components/MinBGComp";
import {
  EyeOutlined,
  RadarChartOutlined,
  BulbOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import HelmetScene from "../components/HackerMaskScene";
import BlackholeScene from "../components/BlackholeScene";
import EyesFollowCursor from "../components/EyeMotion";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

function Landing() {
  const [activeText, setActiveText] = useState(null);
  const text =
    "Black holes typically form when massive stars collapse at the end of their life cycle. After a black hole has formed, it can grow by absorbing mass from its surroundings";

  const explainData = [
    {
      icon: <EyeOutlined />,
      para: "Cursor based eye tracking",
    },
    {
      icon: <RadarChartOutlined />,
      para: "Math constrained movement",
    },
    {
      icon: <BulbOutlined />,
      para: "Intelligent motion logic",
    },
    {
      icon: <ClockCircleOutlined />,
      para: "Idle blink behavior",
    },
  ];

  const exploreData = [
    {
      title: "URL Phishing Detection",
      desc: "Detect malicious URLs in real time using ML models trained on large phishing datasets.",
    },
    {
      title: "Mail Phishing Detection",
      desc: "Analyze email content, headers, and metadata to identify phishing attempts instantly.",
    },
    {
      title: "Early Threat Neutralization",
      desc: "Identify and block potential security threats at an early stage before damage occurs.",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* bg screen for watermark with 0 opacity*/}
        <div className="absolute inset-0 flex justify-center items-start pt-20 lg:pt-35 opacity-80 pointer-events-none">
          <h1 className="font-extrabold text-5xl sm:text-5xl lg:text-7xl text-orange-400">
            Blackhole.
          </h1>
        </div>

        {/* the screen which have all components of the landing screen */}
        <div className="absolute h-screen w-full opacity-100 flex flex-col items-center justify-between pt-10 pb-20">
          <div className="text-center">
            <h1 className="font-extrabold text-4xl sm:text-7xl lg:text-8xl bg-linear-to-t from-white via-zinc-300 to-zinc-700  bg-clip-text text-transparent tracking-tight">
              BEAT THE THREAT
            </h1>
          </div>
          <div className="h-[65%] w-full relative flex justify-between gap-10">
            {/* first section */}
            <div className="hidden w-[50%] h-full lg:flex flex-col gap-2 ">
              <div className="bg-zinc-600 w-full h-[50%] border-2 border-green-800 overflow-hidden rounded-sm">
                <HackerCLIBg />
              </div>
              <div className="w-[75%] h-[50%] rounded-sm border-2 border-green-800 p-2 flex justify-center items-center gap-4">
                <div className="w-[50%] h-full">
                  <CThreatRadar />
                </div>
                <div className="w-[50%] h-full">
                  <ThreatRadar />
                </div>
              </div>
            </div>
            <div className="absolute top-0 lg:bottom-0 left-1/2 -translate-x-1/2 h-60 w-65 lg:h-90 lg:w-95 z-40 flex items-center lg:items-end justify-center">
              <HelmetScene />
            </div>
            <div className="w-[50%] h-full flex flex-col items-center justify-evenly gap-2">
              <div className="h-full w-full border-2 border-green-800 rounded-sm overflow-hidden">
                <HackerBackground />
              </div>
              <div className="h-[40%] w-full flex flex-col items-end justify-evenly">
                <div>
                  <img
                    className="w-16 ml-4 float-right h-12"
                    src="https://www.vikaspal.me/image/source.gif"
                  />
                </div>
                <div className="h-12 w-[80%] flex items-center justify-center rounded-sm overflow-hidden">
                  <CLITerminal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-screen w-full overflow-hidden">
        {/* 🎥 video background */}
        <div className="absolute inset-0 h-[75%] w-full z-0 rounded-sm overflow-hidden">
          <video
            src="/media/175323-853193719_medium.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🌫️ overlay */}
        <div className="absolute inset-0 h-[75%] w-full z-10 bg-linear-to-r from-zinc-950 to-transparent pointer-events-none rounded-sm" />

        {/* 🧠 main content */}
        <div className="relative z-20 h-[75%] w-full backdrop-blur-xs rounded-sm p-5">
          {/* yahan tera actual UI / content aayega */}
          <div className="h-[30%] w-full flex items-end pb-5">
            <h1 className="text-orange-400 font-bold text-5xl">
              Blackhole. <br />{" "}
              <p className="font-bold tracking-wider text-4xl text-white">
                The point of singularity
              </p>
            </h1>
            {/* floating space ship 3d model broewwww */}
            {/* <div className="bg-amber-500 w-[30] h-full"></div> */}
          </div>
          <div className="h-[60%] w-full mt-10 flex items-center justify-evenly gap-2">
            {/* <div className="h-full w-[25%] rounded-sm">
              <BlackholeScene />
            </div> */}
            <div className="h-full w-full flex flex-col gap-2">
              <div className="w-full h-[75%] ">
                <h1 className="text-2xl font-bold tracking-wide">
                  <span className="text-orange-400">Blackhole</span> is an
                  astronomical object with gravitational pull so strong that
                  nothing can escape.
                </h1>
                <h1 className="text-xl text-zinc-300 tracking-wide leading-none mt-1">
                  Black holes typically form when massive stars collapse at the
                  end of their life cycle. After a black hole has formed, it can
                  grow by absorbing mass from its surroundings. Supermassive
                  black holes of millions of solar masses may form by absorbing
                  other stars and merging with other black holes, or via direct
                  collapse of gas clouds. There is consensus that supermassive
                  black holes exist in the centres of most galaxies. The idea of
                  a body so massive that even light could not escape was briefly
                  proposed by English astronomical pioneer and clergyman John
                  Michell and independently by French scientist Pierre-Simon
                  Laplace. Black holes typically form when massive stars
                  collapse at the end of their life cycle. After a black hole
                  has formed, it can grow by absorbing mass from its
                  surroundings. Supermassive black holes of millions of solar
                  masses may form by absorbing other stars and merging with
                  other black holes, or via direct collapse of gas clouds. There
                  is consensus that supermassive black holes exist in the
                  centres of most galaxies. Black holes typically form when
                  massive stars collapse at the end of their life cycle. After a
                  black hole has formed, it can grow by absorbing mass from its
                  surroundings. Supermassive black holes of millions of solar
                  masses may form by absorbing other stars and merging with
                  other black holes, or via direct collapse of gas clouds. There
                  is consensus that supermassive black holes exist in the
                  centres of most galaxies.
                </h1>
              </div>
              <div className="w-full h-[25%] overflow-hidden flex items-center">
                <motion.div
                  className="flex whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <h1 className="text-7xl text-amber-100 font-medium tracking-wide mx-16">
                    {text}
                  </h1>
                  <h1 className="text-7xl text-amber-100 font-medium tracking-wide mx-16">
                    {text}
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <EyesFollowCursor />
      </div>
      <div className="h-screen w-full">
        <div className="h-full w-full flex flex-col">
          {/* the 4 explain section */}
          <div className="w-full h-[30%] flex items-center justify-evenly gap-4 p-2">
            {explainData.map((item, i) => (
              <Explain key={i} icon={item.icon} para={item.para} />
            ))}
          </div>
          <div className="w-full h-[40%] p-2 flex items-center justify-center">
            <div className="h-[70%] w-full flex items-center justify-evenly gap-10">
              {exploreData.map((item, idx) => (
                <ExploreCard key={idx} title={item.title} desc={item.desc} />
              ))}
            </div>
          </div>
          <div className="w-full h-[30%] p-2">
            <div className="h-full w-full bg-amber-50">
              <ImageTextReveal />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full py-8 px-4 overflow-hidden">
        <div className="w-full h-full flex flex-col items-start gap-10">
          <div>
            <h1 className="text-5xl font-bold tracking-wider leading-none">
              Future Updates
            </h1>
          </div>
          <div className="h-full w-full flex items-center justify-center gap-10 relative">
            <div
              className="h-full w-[35%] bg-zinc-200 rounded-2xl flex items-center justify-center group"
              onMouseEnter={() => setActiveText("FYDE")}
              onMouseLeave={() => setActiveText(null)}
            >
              {/* IMAGE BOX */}
              <div
                className="w-80 h-90 rounded-2xl bg-amber-200 overflow-hidden
                 transition-transform duration-100 ease-out
                 group-hover:scale-105"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://www.bing.com/th/id/OIP.VqFvHSAcDq7Q3nlvGAbAKQHaEJ?w=197&h=180&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  alt="img"
                />
              </div>
            </div>

            <div
              className="h-full w-[35%] bg-zinc-950 rounded-2xl flex items-center justify-center group"
              onMouseEnter={() => setActiveText("SKYE")}
              onMouseLeave={() => setActiveText(null)}
            >
              {/* IMAGE BOX */}
              <div
                className="w-80 h-90 rounded-2xl bg-amber-200 overflow-hidden
                 transition-transform duration-100 ease-out
                 group-hover:scale-105"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://www.bing.com/th/id/OIP.VqFvHSAcDq7Q3nlvGAbAKQHaEJ?w=197&h=180&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  alt="img"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                {activeText && (
                  <motion.h1
                    key={activeText} // 🔥 VERY IMPORTANT (re-trigger animation)
                    className="text-amber-500 font-bold text-7xl tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {activeText.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: i * 0.04,
                          ease: "easeOut",
                        }}
                        className={`inline-block ${activeText === "SKYE" ? "text-cyan-400" : "text-amber-400"}`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <Services />
      </div>
    </>
  );
}

export default Landing;

const Explain = ({ icon, para }) => {
  return (
    <div className="group w-[25%] h-full rounded-xl p-5 bg-zinc-900 border border-zinc-700 hover:border-amber-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col gap-4">
      <div className="h-12 w-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      {/* text */}
      <p className="text-amber-100/90 text-sm leading-relaxed">{para}</p>
    </div>
  );
};

const ExploreCard = ({ title, desc }) => {
  return (
    <div className="w-80 bg-zinc-900 border border-zinc-700 rounded-lg p-5 hover:border-amber-500/60 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-zinc-100 tracking-wide mb-2">
        {title}
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-4">
        {desc}
      </p>

      <button className="mt-4 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
        Explore →
      </button>
    </div>
  );
};

function ImageTextReveal() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 50%"],
  });

  const paragraph = `Security is no longer about reacting after a breach occurs. It is about understanding systems, anticipating threats, and building protection into every layer of technology. Security is no longer about reacting after a breach occurs. It is about understanding systems, anticipating threats, and building protection into every layer of technology. Security is no longer about reacting after a breach occurs. It is about understanding systems, anticipating threats, and building protection into every layer of technology. Security is no longer about reacting after a breach occurs. It is about understanding systems, anticipating threats, and building protection into every layer of technology. Security is no longer about reacting after a breach occurs. It is about understanding systems, anticipating threats, and building protection into every layer of technology.`;
  const words = paragraph.split(" ");

  return (
    <section
      ref={ref}
      className="relative h-full w-full bg-zinc-950 flex items-center justify-center px-10"
    >
      <p className="text-lg leading-tight font-medium text-zinc-100 flex flex-wrap gap-x-3">
        {words.map((word, i) => {
          const delay = 0.05;
          const start = i / words.length;
          const end = start + 1 / words.length;

          const opacity = useTransform(
            scrollYProgress,
            [start, end],
            [0.15, 1],
          );

          return (
            <motion.span
              key={i}
              style={{ opacity }}
              animate={{ animationDelay: 2000 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </p>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Vulnerability Assessment & Penetration Testing",
      img: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    },
    {
      title: "Smart Contract Scan",
      img: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5",
    },
    {
      title: "AI Threat Identification",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
    {
      title: "Ml Based Phishing detection",
      img: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca",
    },
    {
      title: "Early Thret Neutralization",
      img: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28",
    },
  ];

  const [activeService, setActiveService] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden mt-10">
      {/* services list */}
      <div className="relative min-h-screen w-full">
        {services.map((service, idx) => (
          <div key={idx}>
            <div
              className="h-28 w-full flex items-center px-6 border border-transparent hover:border-amber-500 transition-all"
              onMouseEnter={() => setActiveService(service)}
              onMouseLeave={() => setActiveService(null)}
              onMouseMove={(e) =>
                setCursor({ x: e.clientX + 20, y: e.clientY + 20 })
              }
            >
              <h3 className="text-5xl font-medium tracking-wider">
                {service.title}
              </h3>
            </div>

            {idx < services.length - 1 && <hr className="border-zinc-800" />}
          </div>
        ))}
      </div>

      {/* cursor-follow image */}
      {activeService && (
        <div
          className="fixed top-0 left-0 -translate-y-[50%] -translate-x-[50%] z-50 pointer-events-none transition-transform duration-150 ease-in-out"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        >
          <img
            src={activeService.img}
            alt=""
            className="w-56 h-36 object-cover rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
