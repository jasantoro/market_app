import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Product, User } from "../models";
import DropdownMenu from "./DropdownMenu";

interface ResponsiveNavbarProps {
  user: User | null;
  cart: Product[];
  handleLogout: () => void;
}

const loggedInLinks = {
  cliente: [
    { path: "/cart", name: (cart: Product[]) => `Carrito (${cart.length})` },
  ],
  admin: [
    { path: "/", name: (_: any) => "Pedidos" },
    { path: "/metrics", name: (_: any) => "Métricas" },
    { path: "/admin/users", name: (_: any) => "Usuarios" },
    { path: "/admin/products", name: (_: any) => "Productos" },
  ],
};
const loggedOutLinks = [
  { path: "/", name: "Login" },
  { path: "/register", name: "Registrarse" },
];

const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({
  user,
  cart,
  handleLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-green-700 dark:text-green-400"
        >
          MarketApp
        </Link>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <nav
          className={`flex-col md:flex-row md:flex ${
            menuOpen ? "flex" : "hidden"
          } md:items-center md:space-x-4 md:space-y-0 space-y-2 mt-4 md:mt-0`}
        >
          {user ? (
            <>
              {loggedInLinks[user.role].map((l) => (
                <NavLink
                  to={l.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700"
                      : "block px-4 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                >
                  {l.name(cart)}
                </NavLink>
              ))}
              <DropdownMenu user={user} handleLogout={handleLogout} />
            </>
          ) : (
            <>
              {loggedOutLinks.map((l) => (
                <NavLink
                  to={l.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700"
                      : "block px-4 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                >
                  {l.name}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default ResponsiveNavbar;
