import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  MdHome,
  MdHotel,
  MdRestaurant,
  MdLogout,
  MdMenu,
  MdTrendingUp,
} from "react-icons/md";
import { IHomeLink } from "@/types";
import { homeLinks } from "@/constants";
import { SignOutAccount } from "@/lib/appwrite/api";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const signOut = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No token found. User might already be signed out.");
      }

      const session = await SignOutAccount();

      if (!session) {
        throw new Error("Sign-out failed, session not deleted.");
      }

      console.log("Sign-out successful:", session);

      localStorage.removeItem("authToken");

      navigate("/login");

      toast({ title: "Successfully signed out!" });
    } catch (error: any) {
      console.error("Error signing out:", error.message || error);
      alert(`Sign-out failed: ${error.message || "Unknown error occurred"}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar for large screens */}
      <nav className="newnavbar text-white flex items-center justify-between px-6 py-4 shadow-md md:flex">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={120}
            height={36}
            className="hidden md:block"
          />
        </Link>

        <ul className="flex items-center justify-between w-full md:gap-6 md:bg-transparent">
          <div className="flex justify-center flex-grow gap-6">
            <Icon icon={MdHome} to="/" currentPath={location.pathname} />
            <Icon icon={MdHotel} to="/hostel" currentPath={location.pathname} />
            <Icon
              icon={MdRestaurant}
              to="/restaurant"
              currentPath={location.pathname}
            />
            <Icon
              icon={MdTrendingUp}
              to="/Trends"
              currentPath={location.pathname}
            />
          </div>

          <div className="ml-auto">
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={signOut}
            >
              <MdLogout />
            </Button>
          </div>
        </ul>
      </nav>

      {/* Navbar for small screens */}
      <header className="w-full md:hidden">
        <div className="flex justify-between items-center py-4 px-5 bg-[rgba(24,24,24,0.6)] shadow">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              width={130}
              height={36}
              className="md:hidden"
            />
          </Link>

          <div className="flex items-center">
            <button onClick={toggleMenu} className="md:hidden">
              <MdMenu size={30} />
            </button>
            <div className="flex gap-4 items-center ml-4">
              <Button
                variant="ghost"
                className="shad-button_ghost"
                onClick={signOut}
              >
                <MdLogout />
              </Button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <ul className="md:hidden flex flex-col gap-2 px-5 py-5 bg-[rgba(24,24,24,0.6)] shadow-lg absolute right-0 z-50">
            {homeLinks.map((link: IHomeLink) => (
              <li key={link.label} className="text-white">
                <NavLink
                  to={link.route}
                  className="block p-2 hover:bg-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  );
};

const Icon = ({
  icon: IconComponent,
  to,
  currentPath,
  onClick,
}: {
  icon: any;
  to: string;
  currentPath: string;
  onClick?: () => void;
}) => (
  <li className="inline-block my-4 md:my-0">
    <Link
      to={to}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md md:inline-block ${
        currentPath === to ? "text-blue-500" : "text-gray-400"
      } hover:text-blue-300 transition-colors duration-300`}
      onClick={onClick}
    >
      <IconComponent size={24} />
      <span className="hidden md:inline-block">
        {to.replace("/", "") || "Home"}
      </span>
    </Link>
  </li>
);

export default Navbar;
