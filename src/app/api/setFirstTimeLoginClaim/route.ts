import { NextResponse } from 'next/server';
import { initAdmin } from '@/firebase/firebaseAdmin';
import admin from 'firebase-admin'

export async function POST(req: Request) {
    await initAdmin();

    try {
        // Parse the request body
        const body = await req.json();
        const { uid, firstTimeLogin } = body;

        // Validate input
        if (!uid || typeof firstTimeLogin !== 'boolean') {
            return NextResponse.json(
                { message: 'Invalid input' },
                { status: 400 }
            );
        }

        // Set custom claims
        await admin.auth().setCustomUserClaims(uid, { firstTimeLogin });

        return NextResponse.json({
            message: 'First Time Login Claim set successfully',
        });
    } catch (error) {
        console.error('Error setting First Time Login Claim:', error);
        return NextResponse.json(
            { message: 'Failed to set First Time Login Claim' },
            { status: 500 }
        );
    }
}
