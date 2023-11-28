import jwt
from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from datetime import datetime, timedelta
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from api.authentication.models import ActiveSession


def _generate_jwt_token(user):
    token = jwt.encode(
        {"id": user.pk, "exp": datetime.utcnow() + timedelta(days=7)},
        settings.SECRET_KEY,
    )

    return token


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    
    def validate(self, data):        
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Correo requerido para iniciar session"}
            )
        if password is None:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Contraseña requerida para iniciar session"}
            )
        user = authenticate(username=email, password=password)

        if user is None:
            raise exceptions.AuthenticationFailed(
                {"success": False, "msg": "Credenciales Incorrectas"})

        if not user.is_active:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Usuario no activo"}
            )

        try:
            session = ActiveSession.objects.get(user=user)
            if not session.token:
                raise ValueError

            jwt.decode(session.token, settings.SECRET_KEY,
                       algorithms=["HS256"])

        except (ObjectDoesNotExist, ValueError, jwt.ExpiredSignatureError):
            session = ActiveSession.objects.create(
                user=user, token=_generate_jwt_token(user)
            )

        return {
            "success": True,
            "token": session.token,
            "user": {"_id": user.pk, "username": user.username, "email": user.email,
                     "first_name": user.first_name, "last_name": user.last_name, "role": user.role, "cedula": user.cedula},
        }
