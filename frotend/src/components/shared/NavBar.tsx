import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdHotel,
  MdRestaurant,
  MdLogout,
  MdMenu,
  MdTrendingUp,
} from "react-icons/md"; // Import Trends Icon
import { useState } from "react";
import { IconType } from "react-icons/lib";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="newnavbar text-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/assets/icons/logo.svg" alt="logo" width={120} height={36} />
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white md:hidden"
      >
        <MdMenu size={30} />
      </button>

      <ul
        className={`flex items-center justify-between w-full md:gap-6 md:bg-transparent ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Centered Links */}
        <div className="flex justify-center flex-grow gap-6">
          <Icon icon={MdHome} to="/" currentPath={location.pathname} />
          <Icon icon={MdHotel} to="/hostel" currentPath={location.pathname} />
          <Icon
            icon={MdRestaurant}
            to="/restaurant"
            currentPath={location.pathname}
          />
          <Icon
            icon={MdTrendingUp} // Trends Icon
            to="/Trends" // Trends Route
            currentPath={location.pathname}
          />
        </div>

        {/* Logout Button (Far Right) */}
        <div className="ml-auto">
          <Icon icon={MdLogout} to="/logout" currentPath={location.pathname} />
        </div>
      </ul>
    </nav>
  );
};

const Icon = ({
  icon: IconComponent,
  to,
  currentPath,
}: {
  icon: IconType;
  to: string;
  currentPath: string;
}) => (
  <li className="inline-block my-4 md:my-0">
    <Link
      to={to}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md md:inline-block ${
        currentPath === to ? "text-blue-500" : "text-gray-400"
      } hover:text-blue-300 transition-colors duration-300`}
    >
      <IconComponent size={24} />
      <span className="hidden md:inline-block">
        {to.replace("/", "") || "Home"}
      </span>
    </Link>
  </li>
);

export default NavBar;
