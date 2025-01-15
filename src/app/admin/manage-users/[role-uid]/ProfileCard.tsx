import React, { useState, useEffect } from "react";
import { User } from "@/app/interfaces";

const ProfileCard: React.FC<User> = ({ id, name, email, phoneNumber, role }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  // Fetch the current account status (disabled or active)
  useEffect(() => {
    const fetchAccountStatus = async () => {
      try {
        const response = await fetch(`/api/isUserDisabled?uid=${id}`);

        if (response.ok) {
          const data = await response.json();
          setIsDisabled(data.disabled); // Set `isDisabled` based on the user record
        } else {
          console.error("Failed to fetch account disabled status.");
        }
      } catch (error) {
        console.error("Error fetching account disabled status:", error);
      }
    };

    fetchAccountStatus();
  }, [id]);

  // Handle suspend/unsuspend logic
  const handleAccountSuspension = async () => {
    try {
      const response = await fetch("/api/suspendAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: id, disabled: !isDisabled }), // Toggle status
      });

      if (response.ok) {
        const updatedStatus = await fetch(`/api/isUserDisabled?uid=${id}`);
        if (updatedStatus.ok) {
          const data = await updatedStatus.json();
          setIsDisabled(data.disabled); // Ensure the state is consistent with the backend
          alert(
            data.disabled
              ? "Account suspended successfully."
              : "Account unsuspended successfully."
          );
        }
      } else {
        console.error("Failed to update account status.");
      }
    } catch (error) {
      console.error("Error updating account status:", error);
    }
  };

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
        <button
          onClick={handleAccountSuspension}
          className={`px-4 py-2 font-semibold rounded-lg shadow transition ${
            isDisabled
              ? "bg-green-500 hover:bg-green-600 text-white" // Unsuspend button
              : "bg-red-500 hover:bg-red-600 text-white" // Suspend button
          }`}
        >
          {isDisabled ? "Unsuspend Account" : "Suspend Account"} 
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
