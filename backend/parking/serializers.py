from django.utils import timezone

from rest_framework import serializers, exceptions
from rest_framework.validators import UniqueValidator
from parking.models import Vehicle, Space, Register, RegisterTotalDay


class VehicleSerializer(serializers.ModelSerializer):
    placa = serializers.CharField(
        validators=[
        UniqueValidator(
            queryset=Vehicle.objects.exclude(owner__isnull=True),
            message="El Vehiculo ya se encuentra Registrado"
        )]        
    )

    class Meta:
        model = Vehicle
        fields = ['id', 'brand', 'model', 'color',
                  'tipo', 'placa', 'year']
        read_only_field = ["id"]

    def create(self, validate_data):
        try: 
            v = Vehicle.objects.get(placa = validate_data['placa'], owner = None)
            
            if(v.register_manual):
                v.brand = validate_data['brand'] 
                v.model = validate_data['model']
                v.color = validate_data['color'] 
                v.tipo = validate_data['tipo']
                v.year = validate_data['year']
                v.owner = validate_data['owner']
                v.register_manual = False
                v.save(update_fields=['brand','model','color','tipo','year','owner','register_manual'])
            else:
                v.owner = validate_data['owner']
                v.register_manual = validate_data['register_manual']            
                v.save(update_fields=['owner', 'register_manual'])                                                     
            return v
        except Vehicle.DoesNotExist:            
            return Vehicle.objects.create(**validate_data)


class SpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = '__all__'
        read_only_field = ['number', 'location']
        
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class RegisterSerializer(serializers.ModelSerializer):
    time_entry = serializers.TimeField(read_only=True)
    date = serializers.DateField(read_only=True)

    class Meta:
        model = Register
        fields = '__all__'

    def validate(self, attrs):
        registers = Register.objects.filter(
            vehicle=attrs['vehicle'], is_active=True, date=timezone.localtime(timezone.now()).date())
        if registers:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Ya existe un registro activo"})
        return super().validate(attrs)


class RegisterFilteredSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    guard = serializers.ReadOnlyField(source='guard.email')    
    vehicle = serializers.ReadOnlyField(source='vehicle.placa')

    class Meta:
        model = Register
        fields = '__all__'        


class RegisterTotalDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterTotalDay
        # fields = ('id', 'date', 'number_vehicles', 'part_of_day')
        fields = '__all__'
