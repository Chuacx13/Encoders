"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUser, FaUsers, FaBars } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";


interface SidebarProps {
  userType: "admin" | "resident";
}

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: <FaHome /> },
  { href: "/admin/manage-users", label: "Manage Users", icon: <FaUsers /> },
  { href: "/admin/create-accounts", label: "Create Accounts", icon: <IoPersonAdd />}
];

const residentLinks = [
  { href: "/resident", label: "Dashboard", icon: <FaHome /> },
  { href: "/resident/profile", label: "Profile", icon: <FaUser /> }
];

export default function Sidebar({ userType }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");

  const links = userType === "admin" ? adminLinks : residentLinks;

  return (
    <div
      className={`bg-gray-700 text-white h-screen flex flex-col transition-width duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
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
