import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  FileText,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyles = (path) => {
    return `flex items-center gap-3 font-medium py-2 px-3 rounded-lg transition-colors ${
      isActive(path) ? "bg-red-orange text-white" : "text-gray-500 hover:bg-gray-50"
    }`;
  };

  return (
    <nav className="flex items-center gap-4">
      <Link to="/" className={getLinkStyles("/")}>
        <Home
          size={20}
          className={isActive("/") ? "text-white" : "text-gray-500"}
        />
        <span>Home</span>
      </Link>

      <Link to="/admin" className={getLinkStyles("/admin")}>
        <BarChart2
          size={20}
          className={isActive("/admin") ? "text-white" : "text-gray-500"}
        />
        <span>Admin</span>
      </Link>

      <Link to="/team" className={getLinkStyles("/team")}>
        <Users
          size={20}
          className={isActive("/team") ? "text-white" : "text-gray-500"}
        />
        <span>Team</span>
      </Link>

      <Link to="/profile" className={getLinkStyles("/profile")}>
        <Settings
          size={20}
          className={isActive("/profile") ? "text-white" : "text-gray-500"}
        />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

export default Navbar;
