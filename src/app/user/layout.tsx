import { ReactNode } from "react";
import Sidebar from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar userType="user" />
      <div className="flex flex-1">
        <Sidebar userType="user" />
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
