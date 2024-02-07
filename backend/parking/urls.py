from django.urls import path
from parking.views import (VehicleViewList, VehicleViewDetail, SpaceViewList,
                           SpaceViewDetail, CheckView, CheckManualView, 
                           RegisterEntryView, RegisterDepartureView,
                           RegisterViewFiltered, RegistertTotalDayViewList, 
                           TeachMLAlgView, PrognosisMLAlgView, StateMLALgView,
                           RegisterTDViewList, RegisterViewList, Vehicle2ViewList
                           )

urlpatterns = [
    path(r'vehicle/', VehicleViewList.as_view(), name='vehicle-list'),
    path(r'vehicle/<int:pk>/', VehicleViewDetail.as_view(), name='vehicle-detail'),
    path(r'space/', SpaceViewList.as_view(), name='space-list'),
    path(r'space/<int:pk>/', SpaceViewDetail.as_view(), name='space-detail'),
    path(r'check/<uuid:uuid>/', CheckView.as_view(), name='check'),
    path(r'check/manual/<str:placa>/', CheckManualView.as_view(), name='check-manual'),
    path(r'register/', RegisterViewFiltered.as_view(), name='register-filtered'), #*: register/?year={y}&month={m}&day={d}&placa={p}
    path(r'register/entry/', RegisterEntryView.as_view(), name='register-entry'),
    path(r'register/<int:pk>/departure/',
         RegisterDepartureView.as_view(), name='register-departure'),
    path(r'registertotalday/', RegistertTotalDayViewList.as_view(),
         name='registertotalday-list'),
    path(r'ml/status/', StateMLALgView.as_view(), name='ml-state'),
    path(r'ml/teach/', TeachMLAlgView.as_view(), name='ml-teach'),
    path(r'ml/prognosis/', PrognosisMLAlgView.as_view(), name='ml-prognosis'), #*: ml/prognosis/?year={y}&month={m}&day={d}&pod={p}
    path(r'regtd/', RegisterTDViewList.as_view(), name='regtd-list'),
    path(r'registerlist/', RegisterViewList.as_view(), name='register-list'),
    path(r'vehicle2/', Vehicle2ViewList.as_view(), name='vehicle2-list'),
]
