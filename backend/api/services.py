from appwrite.client import Client
from appwrite.services.account import Account
from appwrite.services.databases import Databases
from appwrite.services.avatars import Avatars


import base64
# Initialize Appwrite Client
client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")
client.set_project("6734735b002ac0f32e0e")
client.set_key("standard_07132112c64318970f25e1217886a94a852355aaa9e9faf88523b6828f6a4addeb8285c2beee9473ef2650ff380a145d8d0de13dbe4d7ccde1adb4c629068736289bc9d3ef342ff634e878d2c96b300ef2c5136f45eaa617bc685a264a456cb285f0c82399746005212a6a700fea461964f9ebe27abf52a300835c84314bc22b")


account = Account(client)
databases = Databases(client)
avatars = Avatars(client)

def create_user_account(user):
    try:
        new_account = account.create("unique()", user["email"], user["password"], user["name"])

        return save_user_to_db({
            "account_id": new_account["$id"],
            "name": new_account["name"],
            "email": new_account["email"],

        })
    except Exception as e:
        raise e
def save_user_to_db(user):
    try:
        database_id = "673475070005e52b6927"
        collection_id = "6734853c000fc40ad8ab"
        new_user = databases.create_document(
            database_id,
            collection_id,
            "unique()",
            user,
        )
        return new_user
    except Exception as e:
        raise e

def sign_in_account(user):
    try:
        session = account.create_email_password_session(user["email"], user["password"])
        return session
    except Exception as e:
        raise e

def get_current_user():
    try:
        current_account = account.get()
        database_id = "673475070005e52b6927"
        collection_id = "6734853c000fc40ad8ab"
        current_user = databases.list_documents(
            database_id,
            collection_id,
            filters=[f'account_id={current_account["$id"]}'],
        )
        return current_user["documents"][0]
    except Exception as e:
        raise e

def sign_out_account():
    try:
        session = account.delete_session(session_id="current")
        return True
    except Exception as e:
        print(f"Sign-out error: {str(e)}")  # Log detailed error
        raise e

def check_active_session(token):
    try:
        session = account.get_session(token)  # Replace with actual token validation
        return session and session["$id"] == token
    except Exception as e:
        print("Session validation error:", e)
        return None

