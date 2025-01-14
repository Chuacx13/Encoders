"use client"
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { User, Resident } from "@/app/interfaces";
import { useRouter } from "next/navigation";

const fetchUsers = async () => {
  const adminsCollection = collection(db, "admins");
  const residentsCollection = collection(db, "residents");

  try {
    const adminsSnapshot = await getDocs(adminsCollection);
    const residentsSnapshot = await getDocs(residentsCollection);

    const adminsData = adminsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), 
      role: "admin", 
    })) as User[];

    const residentsData = residentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), 
      role: "resident", 
    })) as Resident[];

    return [...adminsData, ...residentsData]; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
    };

    loadUsers();
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-col overflow-y-auto p-6 bg-gray-50">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => router.push(`/admin/manage-resident/${user.id}`)}
          className="w-full bg-white shadow-md rounded-lg p-6 border border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:text-white"
        >
          <h2 className="text-lg font-bold hover:text-inherit">{user.name}</h2>
          <p className="text-sm hover:text-inherit">Email: {user.email}</p>
          <p className="text-sm hover:text-inherit">Phone: {user.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
}