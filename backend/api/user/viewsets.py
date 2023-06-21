from django.http import Http404
from api.user.serializers import UserSerializer, UserQrcodeSerializer
from api.user.models import User
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import mixins
from rest_framework.views import APIView


class UserViewSet(
    viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin
):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    error_message = {"success": False, "msg": "Error updating user"}

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = User.objects.get(id=request.data.get("userID"))
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user_id = request.data.get("userID")

        if not user_id:
            raise ValidationError(self.error_message)

        if self.request.user.pk != int(user_id) and not self.request.user.is_superuser:
            raise ValidationError(self.error_message)

        self.update(request)

        return Response({"success": True}, status.HTTP_200_OK)


class UserQrcodeView(APIView):
    permission_classes = [AllowAny,]
    def get_object(self, pk):
        try:            
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):        
        user = self.get_object(pk)        
        serializers = UserQrcodeSerializer(user)        
        return Response(serializers.data, status=status.HTTP_200_OK)
