import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
function App() {
  return (
    <>
      {/* <div className="bg-zinc-100 min-h-screen w-screen text-black">
        <Navbar></Navbar>
        <Landing></Landing>
        <About></About>
        <Footer></Footer>
        <Dashboard />
        <Login />
        <Register />
        <VerifyEmail />
      </div>
      <div className="bg-white min-h-screen w-screen text-black">
        <Dashboard />
      </div> */}
      <div className="bg-zinc-950 min-h-screen w-screen px-10 text-white">
        <Navbar></Navbar>
        <Routes>
          {/* Default route ko Login par redirect kar rahe hain */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
