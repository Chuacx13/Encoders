"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { Admin, Resident } from "@/app/interfaces";
import { getAdminById, getResidentById } from "@/app/api";

export default function UserProfile() {
  const params = useParams();
  const [role, uid] = (params["role-uid"] as string|| "").split("-");

  const [user, setUser] = useState<Admin | Resident>();

  useEffect(() => {
    if (uid && role) {
      const fetchUser = async () => {
        try {
          let data: Admin | Resident | null = null;
          const collectionName = role === "Resident" ? "residents" : "admins";

          if (collectionName ==  "residents") {
            data = await getResidentById(uid);
          } else if (collectionName == "admins") {
            data = await getAdminById(uid);
          }

          if (data) { 
            setUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }
  }, [uid, role]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ProfileCard
        id={uid}
        name={user.name}
        email={user.email}
        phoneNumber={user.phoneNumber}
        role={role as string}
      />
    </div>
  );
}
