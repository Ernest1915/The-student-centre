from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # API Endpoints
    path('api/', include('api.urls')),  # Include URLs from the 'api' app
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Optional: Add a default root URL if necessary
# Example: Redirect to API documentation or homepage
# from django.views.generic import RedirectView
# urlpatterns += [
#     path('', RedirectView.as_view(url='/api/', permanent=False)),
# ]
