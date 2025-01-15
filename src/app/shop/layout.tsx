import { ReactNode } from "react";
import Navbar from "../(components)/Navbar";

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="h-screen">
      <main className=" overflow-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
