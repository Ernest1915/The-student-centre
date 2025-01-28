from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.conf import settings
from datetime import datetime as dt
from django.utils.timezone import now, timedelta
from api.services import (
    create_user_account,
    check_active_session,
    sign_in_account,
    get_current_user,
    sign_out_account,
    upload_media_to_bucket,
    create_trend_document,
    fetch_trends,
    delete_trend_document,
    fetch_cafeterias,

    users,
    BUCKET_ID,
    PROJECT_ID
)

# users 


@api_view(["POST"])
def create_user(request):
    try:
        user_data = request.data
        # Validate input data
        if not user_data.get("email") or not user_data.get("password") or not user_data.get("name"):
            return Response({"error": "All fields are required."}, status=400)

        new_user = create_user_account(user_data)
        return Response(new_user, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["POST"])
def sign_in(request):
    try:
        # Extract user credentials from request data
        user_data = request.data
        
        # Validate the required fields
        if not user_data.get("email") or not user_data.get("password"):
            raise ValidationError("Both email and password are required.")
        
        # Attempt to sign in and create session
        session = sign_in_account(user_data)
        
        # Return the session token (access token)
        return Response({"token": session["$id"], "message": "Login successful"}, status=200)
    
    except ValidationError as e:
        # Return validation errors if any
        return Response({"error": str(e)}, status=400)
    
    except Exception as e:
        # Return any other errors (invalid credentials, etc.)
        return Response({"error": str(e)}, status=401)

@api_view(["GET"])
def get_user(request):
    try:
        current_user = get_current_user()
        return Response(current_user, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=404)

@api_view(["POST"])
def sign_out(request):
    pass
#     try:


#         # Check for active session
#         if not check_active_session(token):
#             return Response({"error": "No active session found. Cannot sign out."}, status=400)

#         # Perform sign-out
#         sign_out_account(token)
#         return Response({"message": "Signed out successfully"}, status=200)
#     except Exception as e:
#         return Response({"error": str(e)}, status=400)


#trends

@api_view(["POST"])
def add_trend(request):
    try:
        # Extract data from the request
        user_id = request.data.get("user_id")
        media_file = request.FILES.get("media")
        caption = request.data.get("caption", "").strip()
        location = request.data.get("location", "").strip()
        
        print("Media File Type:", type(media_file)) 

        # Validate required fields
        if not user_id:
            return Response({"error": "user_id is required."}, status=400)
        if not media_file:
            return Response({"error": "Media file is required."}, status=400)
        if not caption:
            return Response({"error": "Caption is required."}, status=400)
        if not location:
            return Response({"error": "Location is required."}, status=400)

        
        print("uploading media ....")
        # Upload media and create the trend document
        media_url = upload_media_to_bucket(media_file)
        print("uploaded media ....")
        
        
        print("getting user name ... ", user_id)
        user = users.get(user_id)
        print(user)
        user_name = user['name']
        print(user_name)
        
        trend_data = {
            "user_id": user_id,
            "user_name": user_name ,
            "media_url": media_url,
            "time": dt.now().isoformat(),
            "caption": caption,
            "location": location,
        }
        print("creating trend ....")
        trend = create_trend_document(trend_data)
        print("created trend ....")
        
        trend["media_url"] = f"https://cloud.appwrite.io/v1/storage/buckets/{BUCKET_ID}/files/{media_url}/preview?project={PROJECT_ID}"

        return Response(trend, status=201)

    except Exception as e:
        # Log and return error for debugging
        return Response({"error": f"An error occurred: {str(e)}"}, status=400)

@api_view(["GET"])
def get_trends(request):
    """
    Fetch all trends available.
    """
    try:
        trends = fetch_trends()
        return Response(trends, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["DELETE"])
def delete_expired_trends(request):
    try:
        time_limit = (now() - timedelta(hours=24)).isoformat()
        trends = fetch_trends([f"time<{time_limit}"])

        for trend in trends:
            delete_trend_document(trend["$id"])

        return Response({"message": "Expired trends deleted successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["GET"])
def refresh_trends(request):
    try:
        user_id = request.query_params.get("user_id")

        if not user_id:
            return Response({"error": "user_id is required."}, status=400)

        time_limit = (now() - timedelta(hours=24)).isoformat()
        filters = [f"user_id!={user_id}", f"time>{time_limit}"]

        trends = fetch_trends(filters)
        return Response(trends, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
@api_view(["GET"])    
def get_cafes(request):
    try:
        cafes = fetch_cafeterias()
        return Response(cafes, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)   
