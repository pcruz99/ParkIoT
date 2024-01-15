from django.db import models

class RecoveryPass(models.Model):
    date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    token = models.CharField(max_length=255)
    user = models.ForeignKey("api_user.User", on_delete=models.CASCADE)