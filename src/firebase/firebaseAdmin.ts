import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
    projectId: string;
    privateKey: string;
    clientEmail: string;
}
  
function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}
  
export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatPrivateKey(params.privateKey);

    if (admin.apps.length > 0) {
        return admin.app();
    }

    const cert = admin.credential.cert({
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey,
    });

    return admin.initializeApp({
        credential: cert,
        projectId: params.projectId,
    });
}
  
export async function initAdmin() {
    const params = {
        projectId: process.env.GOOGLE_PROJECT_ID as string,
        privateKey: process.env.GOOGLE_PRIVATE_KEY as string,
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL as string
    };

    return createFirebaseAdminApp(params);
}