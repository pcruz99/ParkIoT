from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from api.user.models import User
from api.authentication.models import RecoveryPass
from uuid import uuid4


class SendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)    

    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs['email'])
        except User.DoesNotExist:
            raise ValidationError({'message': 'No existe el Usuario con este Correo'})

        try:
            recovery_pass = RecoveryPass.objects.get(user=user)            
            if recovery_pass.date < timezone.localdate(timezone.now()) or not recovery_pass.is_active:
                recovery_pass.delete()
                recovery_pass = RecoveryPass.objects.create(token=uuid4(), user=user)
            else:
                raise ValidationError({'message': 'Correo ya Enviado'})
        except RecoveryPass.DoesNotExist:
            recovery_pass = RecoveryPass.objects.create(token=uuid4(), user=user)

        return recovery_pass
