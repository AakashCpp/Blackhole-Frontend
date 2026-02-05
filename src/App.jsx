import "./App.css";
import { ThreatRadar, CThreatRadar, CLITerminal } from "./components/MinBGComp";

function App() {
  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white p-20">
        <div className="w-120 h-12">
          <CLITerminal />
        </div>
      </div>
    </>
  );
}

export default App;
