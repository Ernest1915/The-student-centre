from appwrite.client import Client
from appwrite.services.account import Account
from appwrite.services.databases import Databases
from appwrite.services.avatars import Avatars
from appwrite.services.storage import Storage
from appwrite.services.users import Users
from appwrite.input_file import InputFile

import io
import base64
# Initialize Appwrite Client
client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")
client.set_project("6734735b002ac0f32e0e")
client.set_key("standard_07132112c64318970f25e1217886a94a852355aaa9e9faf88523b6828f6a4addeb8285c2beee9473ef2650ff380a145d8d0de13dbe4d7ccde1adb4c629068736289bc9d3ef342ff634e878d2c96b300ef2c5136f45eaa617bc685a264a456cb285f0c82399746005212a6a700fea461964f9ebe27abf52a300835c84314bc22b")


account = Account(client)
databases = Databases(client)
avatars = Avatars(client)
storage = Storage(client)
users = Users(client)

PROJECT_ID = "6734735b002ac0f32e0e"
DATABASE_ID = "673475070005e52b6927"
USERS_COLLECTION_ID = "6734853c000fc40ad8ab"
TRENDS_COLLECTION_ID = "6772e0af0004396e4dd9"
CAFETERIAS_COLLECTION_ID = '673486cb003b014077a8'
BUCKET_ID = "677adde700173b1e19ed"
HOSTELS_ID = "673475d4000551dcc003"
ROOMS_ID = "68133ff60006575cb26a"


# users 
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
        # Authenticate user using email and password
        session = account.create_email_password_session(user["email"], user["password"])

        # Return session data including the session token
        return session
    except Exception as e:
        raise Exception(f"Sign-in failed: {str(e)}")

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
        print(f"Sign-out error: {str(e)}")  
        raise e

def check_active_session(token):
    try:
        session = account.get_session(token)  
        return session and session["$id"] == token
    except Exception as e:
        print("Session validation error:", e)
        return None


#trends

def upload_media_to_bucket(media_file):
    try:
        print("Uploading result ...")
        media_content = media_file.read()
        filename = media_file.name
        media_file = InputFile.from_bytes(media_content, filename)
        upload_result = storage.create_file(BUCKET_ID, "unique()", media_file)
        print("File created")
        return upload_result["$id"]  # Return file ID as media URL
    except Exception as e:
        raise Exception(f"Failed to upload media: {str(e)}")

def create_trend_document(data):
    try:
        trend = databases.create_document(DATABASE_ID, TRENDS_COLLECTION_ID, "unique()", data)
        return trend
    except Exception as e:
        raise Exception(f"Failed to create trend document: {str(e)}")

def fetch_trends():
    """
    Fetch trends from the database and reconstruct the media URL properly.
    """
    try:
        trends = databases.list_documents(DATABASE_ID, TRENDS_COLLECTION_ID)
        

        sorted_trends = sorted(
            trends["documents"], key=lambda x: x.get("created_at", ""), reverse=True
        )


        for trend in sorted_trends:
            media_id = trend.get("media_url")  
            
            if media_id:
   
                media_url = f"https://cloud.appwrite.io/v1/storage/buckets/{BUCKET_ID}/files/{media_id}/preview?project={PROJECT_ID}"
                trend["media_url"] = media_url  

        return sorted_trends

    except Exception as e:
        raise Exception(f"Failed to fetch trends: {str(e)}")


def delete_trend_document(trend_id):
    try:
        databases.delete_document(DATABASE_ID, TRENDS_COLLECTION_ID, trend_id)
    except Exception as e:
        raise Exception(f"Failed to delete trend document: {str(e)}")
# Cafeterias 
def create_cafeteria_document(data):
    try: 
        cafeteria = databases.create_document(DATABASE_ID, CAFETERIAS_COLLECTION_ID, "unique()", data)
        return cafeteria
    except  Exception as e:
        raise Exception(f"Failednto create cafeteria document: {str(e)}")
def fetch_cafeterias():
    try:
        
        cafeterias = databases.list_documents(DATABASE_ID, CAFETERIAS_COLLECTION_ID)
        
        # Sort the cafeterias by the 'created_at' field in descending order
        sorted_cafeterias = sorted(
            cafeterias["documents"], key=lambda x: x.get("created_at", ""), reverse=True
        )
        
        # Return the sorted list
        return sorted_cafeterias
    
    except Exception as e:
        # Handle any errors and raise a new exception with a descriptive message
        raise Exception(f"Failed to fetch cafeterias: {str(e)}")
def get_Cafeteria(cafeteria_id):
    try:
        cafeteria = databases.get_document(DATABASE_ID,CAFETERIAS_COLLECTION_ID, cafeteria_id)
        return cafeteria
    except Exception as e :
        raise Exception(f"Failed to get that cafeteria: {str(e)}")        
def fetch_Hostels():
    try:
        hostels = databases.list_documents(DATABASE_ID, HOSTELS_ID)
        sorted_hostels = sorted (
            hostels["documents"], key=lambda x: x.get("created_at" , ""), reverse=True

        )
        return sorted_hostels
    except Exception as e:
        
        raise Exception(f"Failed to fetch hostels: {str(e)}")
def get_hostel(hostel_id):
    try:
        hostel = databases.get_document(DATABASE_ID, HOSTELS_ID, hostel_id)
        return hostel
    except Exception as e:
        raise Exception(f"Failed to fetch that hostel: {str(e)}")
    
def get_rooms_for_hostel(hostel_id):
    try:
        rooms = databases.get_documents(DATABASE_ID , ROOMS_ID, hostel_id)   

    