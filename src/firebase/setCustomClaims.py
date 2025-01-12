

import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Replace with the path to your service account key
firebase_admin.initialize_app(cred)

# Function to set custom claims
def set_custom_claims(uid, claims):
    try:
        auth.set_custom_user_claims(uid, claims)
        print(f"Custom claims set for user: {uid}")
    except Exception as e:
        print(f"Error setting custom claims: {e}")

user_uid = ""  # Replace with the actual user's UID
custom_claims = {"admin": True}
set_custom_claims(user_uid, custom_claims)

# Check custom claims
user = auth.get_user(user_uid).custom_claims
print(user)