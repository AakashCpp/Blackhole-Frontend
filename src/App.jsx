import "./App.css";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <div className="bg-zinc-100 min-h-screen w-screen text-black">
        {/* <Navbar></Navbar>
        <Landing></Landing>
        <About></About>
        <Footer></Footer>
        <Dashboard /> */}
        {/* <Login /> */}
        <Register />
      </div>
      {/* <div className="bg-white min-h-screen w-screen text-black">
        <Dashboard />
      </div> */}
    </>
  );
}

export default App;
