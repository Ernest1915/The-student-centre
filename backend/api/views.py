from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from api.services import (
    create_user_account,
    check_active_session,
    sign_in_account,
    get_current_user,
    sign_out_account,
)

# Function to validate and retrieve the token from request headers
def get_token_from_request(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValueError("Authorization token is missing or invalid.")
    return auth_header.split("Bearer ")[1]

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
        user_data = request.data  # {'email': ..., 'password': ...}
        session = sign_in_account(user_data)
        
        # Return session token in response
        return Response({"token": session["$id"], "message": "Login successful"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=401)

@api_view(["GET"])
def get_user(request):
    try:
        # Validate token from headers
        token = get_token_from_request(request)

        # Ensure the session is active
        if not check_active_session(token):
            return Response({"error": "Session is not active or has expired."}, status=401)

        current_user = get_current_user(token)
        return Response(current_user, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=404)

@api_view(["POST"])
def sign_out(request):
    try:
        # Validate token from headers
        token = get_token_from_request(request)

        # Check for active session
        if not check_active_session(token):
            return Response({"error": "No active session found. Cannot sign out."}, status=400)

        # Perform sign-out
        sign_out_account(token)
        return Response({"message": "Signed out successfully"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
