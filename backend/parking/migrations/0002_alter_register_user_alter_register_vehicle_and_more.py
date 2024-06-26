# Generated by Django 4.2.2 on 2024-01-13 09:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("prk", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="register",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="registers",
                to=settings.AUTH_USER_MODEL,
                verbose_name="usuario",
            ),
        ),
        migrations.AlterField(
            model_name="register",
            name="vehicle",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="registers",
                to="prk.vehicle",
                verbose_name="vehiculo",
            ),
        ),
        migrations.AlterField(
            model_name="registertotalday",
            name="is_holiday",
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name="registertotalday",
            name="is_promotionday",
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name="registertotalday",
            name="is_weekend",
            field=models.BooleanField(),
        ),
    ]
