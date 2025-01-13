"use client";

import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from "../../../public/avatar.png";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
        }

        try {
            const user = auth.currentUser;

            if (!user) {
                setError("No user is currently signed in. Please try again.");
                return;
            }

            
            await updatePassword(user, newPassword);

            const token = await user.getIdTokenResult();

            if (token?.claims.firstTimeLogin) {
                const response = await fetch('/api/setFirstTimeLoginClaim', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uid: user.uid,
                        firstTimeLogin: false
                    }),
                });
        
                if (!response.ok) {
                    console.error('Failed to set first time login claim');
                    throw new Error('Failed to set first time login claim');
                }
            }
            
            if (token?.claims.admin) {
                router.push('/admin');
            } else {
                router.push('/resident');
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError("Failed to reset password. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <Image src={avatar} alt="Avatar" width={200} height={200} className="mx-auto rounded-full"/>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Reset Password
            </h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
                <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                New Password
                </label>
                <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your new password"
                />
            </div>
            <div>
                <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                Confirm Password
                </label>
                <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                placeholder="Confirm your new password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Reset Password
            </button>
            </form>
        </div>
        </div>
);
};

export default ResetPassword;
