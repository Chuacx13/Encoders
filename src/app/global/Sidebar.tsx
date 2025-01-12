"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaCog, FaUser, FaUsers, FaBars } from "react-icons/fa";

// Define props interface
interface SidebarProps {
  userType: "admin" | "resident";
}

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: <FaHome /> },
  { href: "/admin/residents", label: "Manage Residents", icon: <FaUsers /> },
  { href: "/admin/settings", label: "Settings", icon: <FaCog /> },
];

const residentLinks = [
  { href: "/resident", label: "Dashboard", icon: <FaHome /> },
  { href: "/resident/profile", label: "Profile", icon: <FaUser /> },
  { href: "/resident/settings", label: "Settings", icon: <FaCog /> },
];

export default function Sidebar({ userType }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");

  const links = userType === "admin" ? adminLinks : residentLinks;

  return (
    <div
      className={`bg-gray-700 text-white min-h-screen flex flex-col ${
        isCollapsed ? "w-20" : "w-52"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-center my-4">
        <button
          className="text-white p-2 rounded-md bg-gray-700 hover:bg-gray-600"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4 flex-1">
        {links.map((link) => (
          <li
            key={link.href}
            className={`${
              isCollapsed ? "flex justify-center" : "mx-5"
            }`}
          >
            <Link
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-600 ${
                activeLink === link.href ? "bg-gray-600" : ""
              } transition-colors duration-300`}
            >
              {link.icon}
              {!isCollapsed && <span className="ml-4">{link.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
