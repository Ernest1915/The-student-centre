from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from api.services import (
    create_user_account,
    save_user_to_db,
    sign_in_account,
    get_current_user,
    sign_out_account,
)

@api_view(["POST"])
def create_user(request):
    try:
        user_data = request.data
        # Add validation checks here
        if not user_data.get("email") or not user_data.get("password") or not user_data.get("name"):
            return Response({"error": "All fields are required."}, status=400)
        new_user = create_user_account(user_data)
        return Response(new_user, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)



@api_view(["POST"])
def sign_in(request):
    user_data = request.data  # {'email': ..., 'password': ...}
    try:
        session = sign_in_account(user_data)
        return Response(session, status=200)
    except Exception as e:
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
    try:
        session = sign_out_account()
        return Response({"message": "Signed out successfully"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
