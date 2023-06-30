from api.user.models import User
from parking.models import Vehicle
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from parking.serializers import VehicleSerializer
from rest_framework.permissions import IsAuthenticated


class VehicleList(APIView):
    permission_classes = [IsAuthenticated,]

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return HTTP_404_NOT_FOUND

    def get(self, request, pk, format=None):
        user = self.get_user(pk)
        vehicles = user.vehicle_set.all()
        serilizer = VehicleSerializer(vehicles, many=True)
        return Response(serilizer.data, status=HTTP_200_OK)

    def post(self, request, pk, format=None):
        user = self.get_user(pk)
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True) and user.vehicle_set.count() < 3:
            serializer.save()
            return Response({"success": "true"}, status=HTTP_200_OK)
        return Response({"success": "false","msg":"No se puede crear vehiculos"}, status=HTTP_400_BAD_REQUEST)
