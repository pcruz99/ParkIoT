from enum import unique
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from parking.models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Vehicle
        fields = ['id', 'brand', 'model', 'color', 'tipo', 'placa', 'owner']
        read_only_field = ["id"]        

    def create(self, validate_data):        
        return Vehicle.objects.create(**validate_data)