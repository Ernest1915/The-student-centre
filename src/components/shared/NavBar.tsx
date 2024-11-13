import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaRocketchat,
  FaPeopleCarry,
  FaAddressCard,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="newsidebar">
      <div className="flex flex-col items-center justify-between h-full">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={120}
            height={36}
          />
        </Link>

        {/* Main section icons */}
        <div className="flex flex-col gap-4 flex-1 items-center">
          <ul className="flex flex-col gap-4 mt-4">
            <Icon
              icon={FaAddressCard}
              to="/profile_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={FaPeopleCarry}
              to="/team_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={FaShoppingCart}
              to="/cart_a"
              currentPath={location.pathname}
            />
            <Icon
              icon={FaRocketchat}
              to="/chat_a"
              currentPath={location.pathname}
            />
          </ul>
        </div>

        {/* Bottom icons */}
        <div className="flex flex-col gap-4 mb-4">
          <Icon icon={FaCog} to="/settings_a" currentPath={location.pathname} />
          <Icon
            icon={FaSignOutAlt}
            to="/logout"
            currentPath={location.pathname}
          />
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
        currentPath === to ? "text-gold-dark" : "text-gray-400"
      } hover:text-gold transition-colors duration-300`}
    >
      <IconComponent size={30} />
    </Link>
  </li>
);

export default NavBar;
