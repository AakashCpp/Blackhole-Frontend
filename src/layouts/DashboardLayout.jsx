import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-zinc-950 min-h-screen w-screen text-white">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
