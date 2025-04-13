import React from "react";
import {
  Home,
  BarChart2,
  FileText,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center gap-4">
      <a
        href="/"
        className="flex items-center gap-3 text-red-orange font-medium py-2 px-3 rounded-lg bg-red-100"
      >
        <Home size={20} className="text-red-orange" />
        <span>Home</span>
      </a>
      <a
        href="/admin"
        className="flex items-center gap-3 text-gray-500 font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
      >
        <span>Admin</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 text-gray-500 font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
      >
        <span>Team</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 text-gray-500 font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
      >
        <Settings size={20} />
        <span>Settings</span>
      </a>
    </nav>
  );
}

export default Navbar;
