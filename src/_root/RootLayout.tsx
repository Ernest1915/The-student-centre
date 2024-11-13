import NavBar from "@/components/shared/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      {/* Render Top Bar*/}

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
