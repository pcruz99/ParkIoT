from django.utils import timezone
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from api.authentication.serializers import SendEmailSerializer
from api.authentication.models import RecoveryPass

from core.settings import SENDER_EMAIL, SENDER_PASSWORD, URL_FRONTEND
from scripts.email import sender_email


class SendEmailViewSet(viewsets.ViewSet):
    http_method_names = ["post"]
    permission_classes = [AllowAny, ]
    serializer = SendEmailSerializer

    def create(self, request):
        serializer = self.serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            recovery_pass = serializer.validated_data
            try:
                sender_email(SENDER_EMAIL, SENDER_PASSWORD,
                             request.data['email'],
                             'ParkIoT: Restablecer Contraseña',
                             f"""En Parkiot, facilitamos el proceso de restablecimiento de contraseña. ¡Recupera el acceso a tu cuenta de manera sencilla y segura con nosotros!
                             Haz clic en el siguiente enlace para restablecer tu contraseña: {URL_FRONTEND}/recoverypassword/{recovery_pass.token}/""")
            except Exception as e:
                print(e)
                recovery_pass.delete()
                return Response({'message': 'Correo No enviado'}, status=HTTP_400_BAD_REQUEST)
            return Response({'message': 'Correo Enviado'}, status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class CheckRecoveryPassViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk):        
        try:
            recovery_pass = RecoveryPass.objects.get(
                token=pk, date=timezone.localdate(timezone.now()), is_active=True)
            return Response({"isActive": recovery_pass.is_active}, status=HTTP_200_OK)
        except RecoveryPass.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)

class RecoveryPassViewSet(viewsets.ViewSet):

    def create(self, request):        
        token = request.data['token']
        password1 = request.data['password1']
        password2 = request.data['password2']
        
        if(password1 != password2):
            return Response({'message': 'Passwords do not match'}, status=HTTP_400_BAD_REQUEST)
                
        try:
            recovery_pass = RecoveryPass.objects.get(
                token=token, date=timezone.localdate(timezone.now()), is_active=True)            
        except RecoveryPass.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)
        
        user = recovery_pass.user
        user.set_password(password1)
        user.save()
        recovery_pass.is_active = False
        recovery_pass.save()
        return Response({'message': 'Password changed successfully'}, status=HTTP_200_OK)