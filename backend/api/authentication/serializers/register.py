from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ObjectDoesNotExist
from api.user.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=4, max_length=128, write_only=True)
    username = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)
    cedula = serializers.CharField(max_length=10, required=True, validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message="Ya existe un Usuario con esta cedula"
        )]
    )

    class Meta:
        model = User
        fields = ["id", "username", "password", "email",
                  "is_active", "date", "first_name", "last_name", "cedula"]

    def validate_username(self, value):
        try:
            User.objects.get(username=value)
        except ObjectDoesNotExist:
            return value
        raise ValidationError(
            {"success": False, "msg": "Nombre de Usuario ya Existente."})

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
        except ObjectDoesNotExist:
            return value
        raise ValidationError(
            {"success": False, "msg": "Correo Electronico ya Existente"})

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
