from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
# from api.authentication.viewsets.social_login import GithubSocialLogin

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path("parking/", include("parking.urls"), name="parking"),
    # path("api/sessions/oauth/github/", GithubSocialLogin.as_view(), name="github_login"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
