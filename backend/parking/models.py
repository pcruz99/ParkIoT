from django.db import models
from api.user.models import User


class Vehicle(models.Model):
    brand = models.CharField(max_length=45, verbose_name="marca")
    model = models.CharField(max_length=45, verbose_name="modelo")
    color = models.CharField(max_length=45)
    tipo = models.CharField(max_length=45)
    placa = models.CharField(max_length=45, unique=True)
    year = models.IntegerField(verbose_name="Año del Vehiculo")
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="dueño")
