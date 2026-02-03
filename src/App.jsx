import { useState } from "react";
import ScanRes from "./pages/ScanRes.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white p-20">
        <ScanRes></ScanRes>
      </div>
    </>
  );
}

export default App;
