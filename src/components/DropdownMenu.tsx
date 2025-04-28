import React, { useRef, useState } from "react";
import { User } from "../models";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

interface DropdownMenuProps {
  user: User;
  handleLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex justify-center w-full rounded-md px-4 py-2 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {user.name}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.356a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          tabIndex={-1}
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div className="py-1">
            <NavLink
              to="/profile"
              onClick={handleItemClick}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700"
                  : "block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            >
              Perfil
            </NavLink>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
