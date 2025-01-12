import { ReactNode } from "react";
import Sidebar from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar userType="admin" />
      <div className="flex flex-1">
        <Sidebar userType="admin" />
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
