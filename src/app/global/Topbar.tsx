import Image from "next/image";
import avatar from "../../../public/avatar.png";

// Define prop types using an interface
interface TopbarProps {
  userType: "admin" | "user";
}

export default function Topbar({ userType }: TopbarProps) {
  return (
    <div className="w-full h-20 bg-gray-800 text-white flex items-center justify-between px-8 shadow-lg">
      <div className="flex items-center gap-4">
        <Image src={avatar} alt="Avatar" width={40} height={40} className="rounded-full" />
        <h1 className="text-xl font-bold">Muhammadiyah Welfare Home</h1>
      </div>
      <div className="flex items-center gap-4">
        <span>{`Welcome, ${userType === "admin" ? "Admin" : "User"}!`}</span>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
}
