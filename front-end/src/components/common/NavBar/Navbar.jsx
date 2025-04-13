import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  FileText,
  MessageCircle,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

function Navbar({ onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyles = (path) => {
    return `flex items-center gap-3 font-medium py-2 px-3 rounded-lg transition-colors ${
      isActive(path)
        ? "bg-red-orange text-white"
        : "text-gray-500 hover:bg-gray-50"
    }`;
  };

  const navLinks = [
    { path: "/", icon: Home, text: "Home" },
    { path: "/admin", icon: BarChart2, text: "Admin" },
    { path: "/team", icon: Users, text: "Team" },
    { path: "/profile", icon: Settings, text: "Profile" },
  ];

  return (
    <div className="relative">
      {/* Hamburger button for mobile */}
      <button
        className="hidden max-[990px]:block p-2 hover:bg-gray-100 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <nav className="flex items-center gap-4 max-[990px]:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={getLinkStyles(link.path)}
          >
            <link.icon
              size={20}
              className={isActive(link.path) ? "text-white" : "text-gray-500"}
            />
            <span>{link.text}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-[#3B82F6] bg-opacity-50 z-40 hidden max-[990px]:block"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu side panel */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } hidden max-[990px]:block`}
      >
        <div className="flex flex-col p-4 h-full">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${getLinkStyles(link.path)} w-full`}
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon
                  size={20}
                  className={
                    isActive(link.path) ? "text-white" : "text-gray-500"
                  }
                />
                <span>{link.text}</span>
              </Link>
            ))}
            {/* Sign Out Button for mobile */}
            <button
              onClick={() => {
                onSignOut();
                setIsMenuOpen(false);
              }}
              className="max-[483px]:flex hidden items-center gap-3 font-medium py-2 px-3 rounded-lg transition-colors text-gray-500 hover:bg-gray-50 w-full"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
