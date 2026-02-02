import { useState } from "react";
import ReportOverview from "./components/ReportOverview";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="bg-zinc-950 h-screen w-screen text-white flex items-center justify-center p-20">
        <ReportOverview />
      </div>
    </>
  );
}

export default App;
