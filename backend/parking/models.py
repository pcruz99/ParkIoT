from django.utils import timezone
from django.db import models
from api.user.models import User

from scripts.feriados import es_feriado

TIPO_CHOICES = (
    ('carro', 'carro'),
    ('moto', 'moto')
)


class Vehicle(models.Model):
    brand = models.CharField(max_length=45, verbose_name="marca", null=True, blank=True)
    model = models.CharField(max_length=45, verbose_name="modelo", null=True, blank=True)
    color = models.CharField(max_length=45, null=True, blank=True)
    tipo = models.CharField(max_length=45, choices=TIPO_CHOICES, null=True, blank=True)
    placa = models.CharField(max_length=45, unique=True)
    year = models.IntegerField(verbose_name="año del vehiculo", null=True, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="dueño", related_name='vehicles', null=True, blank=True)
    register_manual = models.BooleanField()
    
    def save(self, *args, **kwargs):
        self.placa = self.placa.upper()
        super().save(*args, **kwargs)

class Space(models.Model):
    number = models.IntegerField(verbose_name="numero", unique=True)
    location = models.CharField(max_length=45, verbose_name="ubicacion")
    # *This state is equal to free or not free os the parking
    # *true is equivalent of free and false of not free.
    state = models.BooleanField(verbose_name="estado")
    sensor = models.CharField(
        max_length=45, verbose_name="numero sensor", unique=True)
    tipo = models.CharField(max_length=45, choices=TIPO_CHOICES)


class Register(models.Model):
    time_entry = models.TimeField(auto_now_add=True)
    time_departure = models.TimeField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    #TODO: Definir este campo para que acepte valores nulos 
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="usuario", related_name='users', blank=True, null=True)
    vehicle = models.ForeignKey(
        Vehicle, on_delete=models.CASCADE, verbose_name="vehiculo", related_name='vehicles')
    #TODO: Si es necesrio, agregar la informacion del guardia que realizo el registro
    guard = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

class RegisterTotalDay(models.Model):
    date = models.DateField(auto_now_add=True)
    part_of_day = models.CharField(max_length=3)
    is_holiday = models.BooleanField(default=es_feriado(timezone.localtime(timezone.now()).date()))
    is_weekend = models.BooleanField(
        default=True if timezone.localtime(timezone.now()).weekday() >= 5 else False)

    is_promotionday = models.BooleanField(default=False)
    number_vehicles = models.IntegerField(verbose_name="cantidad de vehiculos")
    temperature = models.FloatField(default=0, verbose_name="temperatura de la ciudad")


class PromotionDay(models.Model):
    name = models.CharField(max_length=45)
    date = models.DateField()
    description = models.CharField(max_length=100)

    def today_is_promotionday(self):
        return self.date == timezone.now().date()
    
