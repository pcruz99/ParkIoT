from django.urls import path
from parking.views import VehicleList

urlpatterns = [
    path('vehicle/<int:userid>', VehicleList.as_view(), name='vehicle'),
    # path('vehicle/detail/<int:pk>/', VehicleList.as_view(), name='vehicle'),
]
