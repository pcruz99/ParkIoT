from django.urls import path
from parking.views import (VehicleViewList, VehicleViewDetail, SpaceViewList,
                           SpaceViewDetail, CheckView, RegisterEntryView, RegisterDepartureView,
                           RegisterViewFiltered, RegistertTotalDayViewList, 
                           TeachMLAlgView, PrognosisMLAlgView
                           )

urlpatterns = [
    path(r'vehicle/', VehicleViewList.as_view(), name='vehicle-list'),
    path(r'vehicle/<int:pk>/', VehicleViewDetail.as_view(), name='vehicle-detail'),
    path(r'space/', SpaceViewList.as_view(), name='space-list'),
    path(r'space/<int:pk>/', SpaceViewDetail.as_view(), name='space-detail'),
    path(r'check/<int:uuid>/', CheckView.as_view(), name='check'),
    path(r'register/', RegisterViewFiltered.as_view(), name='register-filtered'), #*: register/?year={y}&month={m}&day={d}&placa={p}
    path(r'register/entry/', RegisterEntryView.as_view(), name='register-entry'),
    path(r'register/<int:pk>/departure/',
         RegisterDepartureView.as_view(), name='register-departure'),
    path(r'registertotalday/', RegistertTotalDayViewList.as_view(),
         name='registertotalday-list'),
    path(r'ml/teach/', TeachMLAlgView.as_view(), name='ml-teach'),
    path(r'ml/prognosis/', PrognosisMLAlgView.as_view(), name='ml-prognosis'), #*: ml/prognosis/?year={y}&month={m}&day={d}&pod={p}
]
