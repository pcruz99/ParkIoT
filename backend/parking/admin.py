from django.contrib import admin
from .models import Space, PromotionDay, RegisterTotalDay, Register, Vehicle

# Register your models here.
admin.site.register(Space)
admin.site.register(PromotionDay)
admin.site.register(RegisterTotalDay)
admin.site.register(Register)
admin.site.register(Vehicle)