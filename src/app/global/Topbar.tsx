"use client"

import Image from "next/image";
import avatar from "../../../public/avatar.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";

interface TopbarProps {
  userType: "admin" | "resident";
}


export default function Topbar({ userType }: TopbarProps) {

  const router = useRouter();

  const handleLogout = async() => {
    
    try {
      await signOut(auth);
      router.push('/');

    } catch(error) {
      console.error(error);
    }
  }
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-4">
        <Image src={avatar} alt="Avatar" width={40} height={40} className="rounded-full" />
        <h1 className="text-xl font-bold">Muhammadiyah Welfare Home</h1>
      </div>
      <div className="flex items-center gap-4">
        <span>{`Welcome, ${userType === "admin" ? "Admin" : "Resident"}!`}</span>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
}

