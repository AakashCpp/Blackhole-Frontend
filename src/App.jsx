import "./App.css";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white px-10">
        <Navbar></Navbar>
        <Landing></Landing>
      </div>
    </>
  );
}

export default App;
