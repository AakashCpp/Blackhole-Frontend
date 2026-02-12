import "./App.css";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen text-white px-10">
        <Navbar></Navbar>
        {/* <Landing></Landing> */}
        <About></About>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
