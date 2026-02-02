import React from "react";

function ReportSceleton() {
  return (
    <>
      <div className="w-screen h-80 bg-zinc-900 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between h-15 w-full">
          <div className="h-full w-120 bg-zinc-800 rounded-xl"></div>
          <div className="h-full w-40 bg-zinc-800 rounded-xl"></div>
        </div>
        <div className="h-2 w-180 bg-zinc-800 rounded-xl"></div>
        <div className="h-2 w-250 bg-zinc-800 rounded-xl"></div>
        <div className="h-2 w-full bg-zinc-800 rounded-xl"></div>

        <div className="h-full w-full bg-zinc-800 p-2 flex flex-col gap-2">
          <div className="bg-zinc-700 h-10 w-60 rounded-sm"></div>
          <div className="bg-zinc-700 h-full w-full rounded-sm"></div>
        </div>
      </div>
    </>
  );
}

export default ReportSceleton;
