from django.contrib import admin
from .models import Space, PromotionDay, RegisterTotalDay

# Register your models here.
admin.site.register(Space)
admin.site.register(PromotionDay)
admin.site.register(RegisterTotalDay)