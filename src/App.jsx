import { useEffect, useRef, useState } from "react";
import "./App.css";
import HackerLoader from "./components/Loaders/3d loader/HackerLoader";

function App() {
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);

    setTimeout(() => {
      setScanning(false);
    }, 40000); // fake scan time
  };
  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white p-20">
        {scanning && <HackerLoader />}

        <button
          onClick={startScan}
          className="px-6 py-3 bg-green-600 text-black font-mono rounded"
        >
          Start Scan
        </button>
      </div>
    </>
  );
}

export default App;
