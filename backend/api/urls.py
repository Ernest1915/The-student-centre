from django.urls import path 
from api.views import (
    create_user, 
    sign_in, 
    get_user, 
    sign_out, 
    add_trend, 
    get_trends, 
    delete_expired_trends, 
    refresh_trends,
    get_Hostels,
    get_cafes,
    get_Hostel_By_Id,
    get_cafe,

)

urlpatterns = [
    
    # User management endpoints
    path("create-user/", create_user, name="create_user"),
    path("sign-in/", sign_in, name="sign_in"),
    path("get-user/", get_user, name="get_user"),
    path("sign-out/", sign_out, name="sign_out"),
    
    
    # Trend management endpoints
    path("add-trend/", add_trend, name="add_trend"),
    path("get-trends/", get_trends, name="get_trends"),
    path("delete-expired-trends/", delete_expired_trends, name="delete_expired_trends"),
    path("refresh-trends/", refresh_trends, name="refresh_trends"),

    #hostels management endpoints 
    path("get_Hostels/", get_Hostels, name="get_hostels"),
    path("get_hostel/<str:hostel_id>/", get_Hostel_By_Id, name="get_Hostel_By_Id"),


    #cafeterias management endpoints
    path("get_cafes/", get_cafes , name="get_cafes"),
    path("get_cafe/<str:cafe_id>/", get_cafe , name="get_cafe")
]
