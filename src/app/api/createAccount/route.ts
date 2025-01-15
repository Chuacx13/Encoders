import { NextResponse } from "next/server";
import { initAdmin } from "@/firebase/firebaseAdmin";
import admin from 'firebase-admin';

export async function POST(req: Request) {
    await initAdmin();

    try {
        const body = await req.json();
        const { email, phoneNumber, password, role } = body

        const isAdmin = role !== 'resident';
        console.log(role);
        const user = await admin.auth().createUser({
            email,
            password, 
            phoneNumber
        })

        await admin.auth().setCustomUserClaims(user.uid, {
            admin: isAdmin, 
            firstTimeLogin: true
        });

        return NextResponse.json({
            message: 'First Time Login Claim set successfully',
            uid: user.uid
        });
    } catch (error) {
        console.error('Error creating account.', error);
        return NextResponse.json(
            { message: 'Failed to Create Account' }, 
            { status: 500 }
        )
    }
} 