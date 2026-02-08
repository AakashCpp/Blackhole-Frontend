import React from "react";
import {
  HackerCLIBg,
  HackerBackground,
  CLITerminal,
  CThreatRadar,
  ThreatRadar,
} from "../components/MinBGComp";
import HelmetScene from "../components/HackerMaskScene";

function Landing() {
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
    </>
  );
}

export default Landing;
