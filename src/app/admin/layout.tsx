import { ReactNode } from "react";
import Sidebar from "@/app/global/Sidebar";
import Topbar from "@/app/global/Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar userType="admin" />
      <div className="flex flex-col flex-1">
        <Topbar userType="admin" />
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
