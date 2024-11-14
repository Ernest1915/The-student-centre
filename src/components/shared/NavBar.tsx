import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdHotel,
  MdRestaurant,
  MdSearch,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { useState } from "react";
import { IconType } from "react-icons/lib";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="newsidebar bg-blue-500 fixed top-0 left-0 h-full md:w-20 lg:w-60">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 text-white md:hidden"
      >
        <MdMenu size={30} />
      </button>

      {/* Sidebar content */}
      <div
        className={`flex flex-col items-center justify-between h-full transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Link to="/" className="flex gap-3 items-center mt-4">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={120}
            height={36}
          />
        </Link>

        {/* Main section icons */}
        <div className="flex flex-col gap-4 flex-1 items-center mt-8">
          <ul className="flex flex-col gap-4">
            <Icon
              icon={MdHome}
              to="/profile_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={MdHotel}
              to="/team_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={MdRestaurant}
              to="/cart_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={MdSearch}
              to="/chat_a"
              currentPath={location.pathname}
            />
          </ul>
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col gap-4 mb-4">
          <Icon icon={MdLogout} to="/logout" currentPath={location.pathname} />
        </div>
      </div>
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
  <li>
    <Link
      to={to}
      className={`${
        currentPath === to ? "text-blue-300" : "text-gray-400"
      } hover:text-blue-500 transition-colors duration-300`}
    >
      <IconComponent size={30} />
    </Link>
  </li>
);

export default NavBar;
