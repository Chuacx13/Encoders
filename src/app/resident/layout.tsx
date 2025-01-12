import { ReactNode } from "react";
import Sidebar from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";

interface ResidentLayoutProps {
  children: ReactNode;
}

export default function ResidentLayout({ children }: ResidentLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar userType="resident" />
      <div className="flex flex-1">
        <Sidebar userType="resident" />
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
