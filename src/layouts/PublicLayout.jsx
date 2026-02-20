import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-screen px-10 text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
