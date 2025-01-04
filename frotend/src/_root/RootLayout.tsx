import NavBar from "@/components/shared/NavBar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Render Top Navigation Bar */}
      <NavBar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
