import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const AuthLayout = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-screen text-white px-10">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
