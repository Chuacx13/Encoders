import { NextResponse } from "next/server";
import { initAdmin } from "@/firebase/firebaseAdmin";
import admin from 'firebase-admin';

export async function POST(req: Request) {
    await initAdmin();

    try {
        const body = await req.json();
        const { uid, disabled } = body;

        await admin.auth().updateUser(uid, {
            disabled: disabled,
        });

        return NextResponse.json({
            message: `User with UID: ${uid} has been suspended successfully.`,
        });
    } catch (error) {
        console.error('Error suspending account.', error);
        return NextResponse.json(
            { message: 'Failed to suspend account' }, 
            { status: 500 }
        )
    }
} 