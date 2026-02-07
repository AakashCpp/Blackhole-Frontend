import "./App.css";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import HelmetScene from "./components/HackerMaskScene";

function App() {
  return (
    <>
      <div className="bg-zinc-950 text-white px-10 h-screen w-screen">
        {/* <Navbar></Navbar>
        <Landing></Landing> */}
        <HelmetScene />
      </div>
    </>
  );
}

export default App;
