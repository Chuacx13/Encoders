"use client";

import { ReactNode, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
  IconShoppingBag,
  IconFunction
} from "@tabler/icons-react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";

interface ResidentLayoutProps {
  children: ReactNode;
}

export default function ResidentLayout({ children }: ResidentLayoutProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "/resident",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/resident/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Auction",
      href: "/residnt/auction",
      icon: <IconFunction className="text-neutral-800 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "/",
      onClick: handleLogout,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Resident",
                href: "#",
                icon: (
                  <Image
                    src="/avatar.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>{" "}
      <div className="flex flex-col flex-1">
        <Topbar userType="resident" />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
