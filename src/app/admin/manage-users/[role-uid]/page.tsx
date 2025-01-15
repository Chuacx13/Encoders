"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import ProfileCard from "./ProfileCard";
import { User, Resident } from "@/app/interfaces";

export default function UserProfile() {
  const params = useParams();
  const [role, uid] = (params["role-uid"] as string|| "").split("-");

  const [user, setUser] = useState<User | Resident>();

  useEffect(() => {
    if (uid && role) {
      const fetchUser = async () => {
        try {
          const collectionName = role === "Resident" ? "residents" : "admins";
          const docRef = doc(db, collectionName, uid as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser(data as User | Resident);
          } else {
            console.error("No document found");
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
