"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Image from "next/image";
import avatar from "../../../public/avatar.png";

declare global {
    interface Window {
      recaptchaVerifier: RecaptchaVerifier; // Use the correct type from Firebase
    }
}

const ForgotPassword = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const router = useRouter();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
              auth,
              "recaptcha-container",
              { size: "normal" }
            );
          }
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            setShowOtpInput(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.code == 'auth/invalid-phone-number') { 
                setError("Invalid Phone Number.")
            } else {
                setError(err.message);
            }
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!verificationId) {
            setError("No OTP sent. Please try again.");
            return;
        }

        try {
            const credential = PhoneAuthProvider.credential(
                verificationId, otp
            )
            await signInWithCredential(auth, credential);
            router.push("/reset-password");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.code == 'auth/invalid-verification-code') { 
                setError("Invalid OTP.")
            } else {
                setError(err.message);
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <Image src={avatar} alt="Avatar" width={200} height={200} className="mx-auto rounded-full"/>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Forgot Password
            </h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {!showOtpInput ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                    <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                    Phone Number
                    </label>
                    <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg. +65 XXXXXXXX"
                    />
                </div>
                <div id="recaptcha-container" className="flex justify-center"></div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Send OTP
                </button>
            </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            OTP
                        </label>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter the OTP"
                        />
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                    Verify OTP
                    </button>
                </form>
            )}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Remembered your password?{" "}
            <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
                Login here
            </Link>
            </p>
        </div>
        </div>
);
};

export default ForgotPassword;
