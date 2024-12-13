import NavBar from "@/components/shared/NavBar";
import Topbar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Render Top Navigation Bar */}
      <NavBar />

      {/* Render Topbar (optional, depending on your design) */}
      <Topbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
