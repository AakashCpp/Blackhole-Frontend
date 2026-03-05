import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PublicScans from "./pages/Public-scans";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import PhishingScanner from "./pages/PhishingPage";
import ScanDetailsPage from "./pages/ScanDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/scans" element={<PublicScans />} />
          <Route path="/about" element={<About />} />
          <Route path="/phishingPage" element={<PhishingScanner />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan-details/:type/:id" element={<ScanDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
