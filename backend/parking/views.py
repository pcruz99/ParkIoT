from datetime import datetime
# django
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.utils import timezone
# rest_framework
from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.user.models import User
from api.user.serializers import UserSerializer
from parking.serializers import VehicleSerializer, SpaceSerializer, RegisterSerializer, RegisterTotalDaySerializer,RegisterFilteredSerializer
from parking.models import Vehicle, Space, Register, RegisterTotalDay

from scripts.partofday import get_part_of_day
from scripts.promotionalday import es_promotionday
from scripts.api_clima import get_temperature

from scripts.ml import teach_model, prognosis_model


class VehicleViewList(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, format=None):
        user = self.request.user
        vehicles = user.vehicles.all()        
        # vehicles = Vehicle.objects.filter(owner=user)
        serilizer = VehicleSerializer(vehicles, many=True)
        return Response(serilizer.data, status=HTTP_200_OK)

    def post(self, request, format=None):
        user = self.request.user
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True) and user.vehicles.count() < 3:
            serializer.save(owner=user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response({"success": False, "msg": "No se puede crear vehiculos"}, status=HTTP_400_BAD_REQUEST)


class VehicleViewDetail(APIView):
    permission_classes = [IsAuthenticated,]

    def get_object(self, pk: int):
        try:
            return Vehicle.objects.get(pk=pk, owner=self.request.user)
        except Vehicle.DoesNotExist:
            return Http404

    def put(self, request, pk, format=None):
        vehicle = self.get_object(pk)
        
    
    
    def delete(self, request, pk, format=None):
        vehicle = self.get_object(pk)
        # vehicle.delete()   
        vehicle.owner = None
        vehicle.save(update_fields=['owner'])
        return Response(status=HTTP_204_NO_CONTENT)


class SpaceViewList(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    generics.GenericAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SpaceViewDetail(mixins.UpdateModelMixin,
                      mixins.RetrieveModelMixin,
                      generics.GenericAPIView):
    queryset = Space.objects.all()
    serializer_class = SpaceSerializer
    permission_classes = [AllowAny,]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        self.partial_update(request, *args, **kwargs)
        return Response({"success": True}, status=HTTP_200_OK)


class RegisterViewFiltered(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        try:
            # date = str(request.GET.get('year')) + '-' + \
            #     str(request.GET.get('month') + '-' + str(request.GET.get('day')))
            date = datetime.strptime(
                str(request.GET.get('year')) + '-' +
                str(request.GET.get('month') + '-' +
                    str(request.GET.get('day'))), "%Y-%m-%d"
            ).date()
        except ValueError:
            return Response(status=HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response(status=HTTP_400_BAD_REQUEST)

        if request.GET.get('placa'):
            try:
                vehicle = Vehicle.objects.get(
                    placa=str(request.GET.get('placa')))
            except Vehicle.DoesNotExist:
                return Response(status=HTTP_400_BAD_REQUEST)
            registers = Register.objects.filter(date=date, vehicle=vehicle)
        else:
            registers = Register.objects.filter(date=date)

        r = RegisterFilteredSerializer(registers, many=True)
        if not r.data:
            return Response(status=HTTP_400_BAD_REQUEST)
        return Response(r.data, status=HTTP_200_OK)


# class RegistertTotalDayViewList(mixins.ListModelMixin,
#                                 generics.GenericAPIView):
#     queryset = RegisterTotalDay.objects.all()
#     serializer_class = RegisterTotalDaySerializer
#     permission_classes = [AllowAny, ]

#     def get(self, request, *args, **kwargs):
#         print(timezone.now().date().month)
#         return self.list(request, *args, **kwargs)

class RegistertTotalDayViewList(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request, format=None):
        res = []
        total = 0
        sql = f"""SELECT id, part_of_day, MONTH(date) as Month, SUM(number_vehicles) AS Total 
            FROM prk_registertotalday     
            WHERE YEAR(date)={timezone.localtime(timezone.now()).date().year}        
            GROUP BY part_of_day, MONTH(date) ORDER BY Month ASC"""

        for i in RegisterTotalDay.objects.raw(sql):
            total += i.Total
            res.append({'month': i.Month, 'part_of_day': str(
                i.part_of_day), 'total': int(i.Total)})
        return Response({"data": {
            "registers": res, "total_vehicles": total
        }}, status=HTTP_200_OK)


class CheckView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request, uuid, format=None):
        try:
            user = User.objects.get(pk=uuid)
        except User.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)
        u_serializer = UserSerializer(user)

        register = Register.objects.filter(
            user=user, date=timezone.localtime(timezone.now()).date()).last()

        #Me valida si no existe un registro o si algun registro ya no esta activo
        #para no entregar informacion al serializador
        if register == None or not register.is_active:
            r_serilizer = None
        else:
            r_serilizer = RegisterSerializer(register)

        return Response({
            "user": u_serializer.data,
            "register": r_serilizer.data if r_serilizer != None else None
        }, status=HTTP_200_OK)


class RegisterEntryView(APIView):
    permission_classes = [AllowAny,]

    def post(self, request, format=None):
        current_date = timezone.localtime(timezone.now())
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            pod = get_part_of_day(current_date.time().hour)

            try:
                register_total = RegisterTotalDay.objects.get(
                    date=current_date.date(), part_of_day=pod)

                register_total.number_vehicles += 1
            except RegisterTotalDay.DoesNotExist:
                temp = get_temperature(str(current_date.date()))
                register_total = RegisterTotalDay.objects.create(
                    part_of_day=pod,
                    is_promotionday=es_promotionday(current_date.date()),
                    number_vehicles=1,
                    temperature=temp['data']['temp'] if temp['success'] else 0
                )

            register_total.save()
            return Response({"success": True, "msg": "Entrada Registrada"}, status=HTTP_201_CREATED)

        return Response(serializer.errors)


class RegisterDepartureView(APIView):
    permission_classes = [AllowAny, ]

    def put(self, request, pk, format=None):
        register = get_object_or_404(Register, pk=pk)
        register.time_departure = timezone.localtime(timezone.now()).time()
        register.is_active = False
        register.save(update_fields=['time_departure', 'is_active'])
        return Response({"success": True, "msg": "Entrada Actualizada"}, status=HTTP_201_CREATED)


class TeachMLAlgView(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request, format=None):
        registros_total = RegisterTotalDay.objects.all()
        # if registros_total.count() < 100:
        #     return Response({"success": False, "msg": "Error al Entrenar Modelo", "error": "min100reg"}, status=HTTP_400_BAD_REQUEST)
        score = teach_model(registros_total)
        if score == 0:
            return Response({"success": False, "msg": "Error al Entrenar Modelo", "error": "scoreEq0"}, status=HTTP_400_BAD_REQUEST)
        return Response({"success": True, "score": score, "msg": "Modelo Entrenado"}, status=HTTP_200_OK)


class PrognosisMLAlgView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request, format=None):
        try:
            date = datetime.strptime(
                str(request.GET.get('year')) + '-' +
                str(request.GET.get('month') + '-' +
                    str(request.GET.get('day'))), "%Y-%m-%d"
            ).date()
            if not request.GET.get('pod'):
                raise ValueError()
            pod = str(request.GET.get('pod')).upper()
        except ValueError:
            return Response({"success": False, "msg": "Faltan datos del Query Params", "error": "dataFault"},
                            status=HTTP_400_BAD_REQUEST)

        pm = prognosis_model(date=date, pod=pod)
        if not pm["success"]:
            return Response(pm, status=HTTP_400_BAD_REQUEST)
        return Response(pm, status=HTTP_200_OK)
