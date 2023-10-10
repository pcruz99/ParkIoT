from django.urls import path, include
from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.user.viewsets import UserViewSet, UserQrcodeView

router = routers.SimpleRouter(trailing_slash = False)

router.register(r"general", UserViewSet, basename="user-general")

router.register(r"register", RegisterViewSet, basename="register")

router.register(r"login", LoginViewSet, basename="login")

router.register(r"checkSession", ActiveSessionViewSet, basename="check-session")

router.register(r"logout", LogoutViewSet, basename="logout")

router2 = routers.SimpleRouter(trailing_slash = True)

router2.register(r"qrcode", UserQrcodeView, basename="qrcode")

urlpatterns = [
    *router.urls,
    path('', include(router2.urls))
]

