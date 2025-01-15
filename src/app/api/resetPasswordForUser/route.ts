import { NextResponse } from "next/server";
import { initAdmin } from "@/firebase/firebaseAdmin";
import admin from "firebase-admin";

export async function POST(req: Request) {
  await initAdmin();

  try {
    const body = await req.json();
    const { uid, email, phoneNumber } = body;

    const newPassword = email.split("@")[0] + phoneNumber.slice(-4);

    await admin.auth().updateUser(uid, {
      password: newPassword,
    });

    return NextResponse.json({
      message: `Password for user with UID: ${uid} has been reset successfully.`,
    });
  } catch (error) {
    console.error("Error resetting password.", error);
    return NextResponse.json(
      { message: "Failed to reset password." },
      { status: 500 }
    );
  }
}
