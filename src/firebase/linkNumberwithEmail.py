import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def link_phone_number_to_user(uid, phone_number):
    try:
        updated_user = auth.update_user(
            uid,
            phone_number=phone_number
        )
        print(f"Successfully linked phone number to user: {updated_user.uid}")
        print(f"Phone Number: {updated_user.phone_number}")
    except Exception as e:
        print(f"Error setting custom claims: {e}")

user_uid = "afNLcZIxYhYmSnT9ebfhAK9Nytn1"  # Replace with UID
phone_number = "+6500000000"  # Replace with phone number (Include country code)
link_phone_number_to_user(user_uid, phone_number)
user = auth.get_user(user_uid)
print(user.uid)
print(user.email)
print(user.phone_number)