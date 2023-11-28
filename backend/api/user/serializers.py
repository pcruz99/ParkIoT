from rest_framework import serializers
from api.user.models import User
from parking.models import Vehicle
from parking.serializers import VehicleSerializer


class UserSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)
    # vehicles = serializers.PrimaryKeyRelatedField(many = True, queryset = Vehicle.objects.all())
    vehicles = VehicleSerializer(many = True)
    class Meta:
        model = User
        fields = ["id", "username", "email", "date", "first_name", "last_name", "vehicles", "cedula"]
        read_only_field = ["id"]


class UserQrcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "qrcode"]
        read_only_field = ["id", "qrcode"]
