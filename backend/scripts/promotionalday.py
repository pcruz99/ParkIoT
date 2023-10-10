from datetime import date
from parking.models import PromotionDay

def es_promotionday(date: date) -> bool:
    return True if PromotionDay.objects.filter(date=date) else False
