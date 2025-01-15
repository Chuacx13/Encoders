// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { FaHome, FaUser, FaUsers, FaBars } from "react-icons/fa";
// import { IoPersonAdd } from "react-icons/io5";

// interface SidebarProps {
//   userType: "admin" | "resident";
// }

// const adminLinks = [
//   { href: "/admin", label: "Dashboard", icon: <FaHome /> },
//   { href: "/admin/manage-users", label: "Manage Users", icon: <FaUsers /> },
//   { href: "/admin/create-accounts", label: "Create Accounts", icon: <IoPersonAdd />}
// ];

// const residentLinks = [
//   { href: "/resident", label: "Dashboard", icon: <FaHome /> },
//   { href: "/resident/profile", label: "Profile", icon: <FaUser /> }
// ];

"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div className="w-[50px] md:hidden">
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

// export default function Sidebar({ userType }: SidebarProps) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeLink, setActiveLink] = useState("/dashboard");

//   const links = userType === "admin" ? adminLinks : residentLinks;

//   return (
//     <div
//       className={`bg-gray-700 text-white h-screen flex flex-col transition-width duration-300 ${
//         isCollapsed ? "w-20" : "w-64"
//       }`}
//     >
//       <div className="flex justify-center my-4">
//         <button
//           className="text-white p-2 rounded-md bg-gray-700 hover:bg-gray-600"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//         >
//           <FaBars size={20} />
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <ul className="space-y-4 flex-1">
//         {links.map((link) => (
//           <li
//             key={link.href}
//             className={`${
//               isCollapsed ? "flex justify-center" : "mx-5"
//             }`}
//           >
//             <Link
//               href={link.href}
//               onClick={() => setActiveLink(link.href)}
//               className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-600 ${
//                 activeLink === link.href ? "bg-gray-600" : ""
//               } transition-colors duration-300`}
//             >
//               {link.icon}
//               {!isCollapsed && <span className="ml-4">{link.label}</span>}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
