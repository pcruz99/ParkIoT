from rest_framework import serializers, exceptions
from rest_framework.validators import UniqueValidator
from parking.models import Vehicle, Space, Register, RegisterTotalDay


class VehicleSerializer(serializers.ModelSerializer):
    placa = serializers.CharField(validators=[
        UniqueValidator(
            queryset=Vehicle.objects.all(),
            message="El Vehiculo ya se encuentra Registrado"
        )]
    )

    class Meta:
        model = Vehicle
        fields = ['id', 'brand', 'model', 'color',
                  'tipo', 'placa', 'year']
        read_only_field = ["id"]

    def create(self, validate_data):
        return Vehicle.objects.create(**validate_data)


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'
        read_only_field = ['number', 'location']


class RegisterSerializer(serializers.ModelSerializer):
    time_entry = serializers.TimeField(read_only=True)
    date = serializers.DateField(read_only=True)
    # user = serializers.ReadOnlyField(source = 'user.username')
    class Meta:
        model = Register
        fields = '__all__'

    def validate(self, attrs):
        registers = Register.objects.filter(user=attrs['user'], is_active=True)
        if registers:                                
                raise exceptions.ValidationError({"success": False, "msg": "Ya existe un registro activo"})
        return super().validate(attrs)

class RegisterTotalDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterTotalDay
        fields = ('id', 'date', 'number_vehicles', 'part_of_day')