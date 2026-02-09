import React from "react";
import {
  HackerCLIBg,
  HackerBackground,
  CLITerminal,
  CThreatRadar,
  ThreatRadar,
} from "../components/MinBGComp";
import HelmetScene from "../components/HackerMaskScene";
import { motion } from "framer-motion";

function Landing() {
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cumque rerum dicta nobis asperiores obcaecati rem voluptas, architecto ducimus vero.";
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
        {/* <div className="absolute inset-0 h-[75%] w-full z-10 backdrop-blur[5px] pointer-events-none rounded-sm" /> */}

        {/* 🧠 main content */}
        <div className="relative z-20 h-[75%] w-full backdrop-blur-xs rounded-sm p-5">
          {/* yahan tera actual UI / content aayega */}
          <div className="h-[30%] w-full px-20 flex items-end pb-5">
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
            <div className="bg-amber-500 h-full w-[25%] rounded-sm">
              model wala part 30%
            </div>
            <div className="h-full w-[75%] flex flex-col gap-2">
              <div className="bg-amber-500 w-full h-[75%]">upper 75</div>
              <div className="w-full h-[25%] overflow-hidden flex items-center">
                {/* <motion.div
                  className="flex whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <h1 className="text-7xl font-medium tracking-wide mx-16">
                    {text}
                  </h1>
                  <h1 className="text-7xl font-medium tracking-wide mx-16">
                    {text}
                  </h1>
                </motion.div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
