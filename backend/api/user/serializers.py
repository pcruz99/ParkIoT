from api.user.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "date", "first_name", "last_name"]
        read_only_field = ["id"]


class UserQrcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "qrcode"]
        read_only_field = ["id", "qrcode"]
