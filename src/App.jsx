import "./App.css";
import { HackerBackground, HackerCLIBg } from "./components/MinBGComp.jsx";

function App() {
  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white p-20">
        <HackerBackground>
          <div className="h-screen flex flex-col justify-center items-center text-center text-green-400">
            <h1 className="text-5xl font-bold tracking-widest">BLACKHOLE</h1>
            <p className="mt-4 text-lg text-green-300">
              Threat Neutralization Platform
            </p>
          </div>
        </HackerBackground>

        <HackerCLIBg>
          <div className="h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-green-400 text-5xl font-bold tracking-widest">
              BLACKHOLE
            </h1>
            <p className="mt-4 text-green-300">
              Threat Neutralization Platform
            </p>
          </div>
        </HackerCLIBg>
      </div>
    </>
  );
}

export default App;
