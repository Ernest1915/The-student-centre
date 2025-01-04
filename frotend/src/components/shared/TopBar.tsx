import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";

import { IHomeLink } from "@/types";
import { homeLinks } from "@/constants";

import { MdLogout, MdMenu } from "react-icons/md";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full md:hidden">
      <div className="flex justify-between items-center py-4 px-5 bg-[rgba(24,24,24,0.6)]  shadow">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex items-center">
          {/* Menu Button on the Right */}
          <button onClick={toggleMenu} className="md:hidden">
            <MdMenu />
          </button>

          <div className="flex gap-4 items-center ml-4">
            <Button
              variant="ghost"
              className="shad-button_ghost"
              onClick={() => signOut()}
            >
              <MdLogout />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-2 px-5 py-5 bg-[rgba(24,24,24,0.6)]  shadow-lg absolute right-0 z-50">
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
  );
};

export default Topbar;
