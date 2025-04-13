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
    <div className="w-60 bg-white p-6 flex flex-row gap-8">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          </svg>
        </div>
      </div>

      <nav className="flex flex-row align-bottom gap-4">
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
    </div>
  );
}

export default Navbar;
