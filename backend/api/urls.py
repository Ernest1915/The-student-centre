from django.urls import path
from api.views import create_user, sign_in, get_user, sign_out

urlpatterns = [
    path("create-user/", create_user, name="create_user"),
    path("sign-in/", sign_in, name="sign_in"),
    path("get-user/", get_user, name="get_user"),
    path("sign-out/", sign_out, name="sign_out"),
]
