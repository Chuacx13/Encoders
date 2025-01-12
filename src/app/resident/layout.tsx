import { ReactNode } from "react";
import Sidebar from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";

interface ResidentLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: ResidentLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar userType="resident" />
      <div className="flex flex-col flex-1">
        <Topbar userType="resident" />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
