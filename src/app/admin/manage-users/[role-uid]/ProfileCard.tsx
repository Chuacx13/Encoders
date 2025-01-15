import React from "react";
import { ProfileCardProps } from "@/app/interfaces";

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, phoneNumber, role }) => {

  
  return (
    <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-300"></div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-600">Email: {email}</p>
          <p className="text-sm text-gray-600">Phone: {phoneNumber}</p>
          <p className="text-sm text-gray-600">Role: {role}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-around">
        <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition">
          Suspend Account
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
