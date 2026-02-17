import "./App.css";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SecurityReportDashboard from "./pages/VulnReportPage";

function App() {
  return (
    <>
      {/* <div className="bg-zinc-950 min-h-screen w-screen text-white px-10">
        <Navbar></Navbar>
        <Landing></Landing>
        <About></About>
        <Footer></Footer>
        <Dashboard />
      </div> */}
      <div className="bg-white min-h-screen w-screen text-black">
        {/* <Dashboard /> */}
        <SecurityReportDashboard />
      </div>
    </>
  );
}

export default App;
