import { NextResponse } from "next/server";
import { initAdmin } from "@/firebase/firebaseAdmin";
import admin from "firebase-admin";

export async function GET(req: Request) {
  await initAdmin();

  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  try {
    const userRecord = await admin.auth().getUser(uid as string);
    return NextResponse.json({
      disabled: userRecord.disabled, // Check the `disabled` property
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return NextResponse.json(
      { message: "Failed to fetch user status." },
      { status: 500 }
    );
  }
}
