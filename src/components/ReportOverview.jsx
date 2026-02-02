import React from "react";

function ReportOverview() {
  return (
    <>
      <div className="w-screen h-80 bg-zinc-900 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between h-15 w-full">
          <div className="relative h-full w-120 bg-zinc-800 rounded-xl overflow-hidden p-4">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-zinc-300 pr-8 font-medium text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              consequatur veniam id.
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-zinc-800 to-transparent" />
          </div>
          <div className="h-full w-40 bg-zinc-800 rounded-xl flex items-center justify-center font-extrabold text-green-700 cursor-pointer hover:scale-105 hover:text-green-600 transition-transform-600">
            Expand
          </div>
        </div>
        <div className="h-2 w-180 bg-zinc-800 rounded-xl"></div>
        <div className="h-2 w-250 bg-zinc-800 rounded-xl"></div>
        <div className="h-2 w-full bg-zinc-800 rounded-xl"></div>

        <div className="h-full w-full bg-zinc-800 p-2 flex flex-col gap-2">
          <div className="bg-zinc-700 h-10 w-60 rounded-sm flex items-start px-5 font-black">
            Open Ports
          </div>
          <div className="bg-zinc-700 h-full w-full rounded-sm"></div>
        </div>
      </div>
    </>
  );
}

export default ReportOverview;
