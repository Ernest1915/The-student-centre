import NavBar from "@/components/shared/NavBar";
import Topbar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* Render Top Bar*/}
      <Topbar />

      {/* Render Side Bar */}
      <NavBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      {/* Render Bottom Bar */}
    </div>
  );
};

export default RootLayout;
