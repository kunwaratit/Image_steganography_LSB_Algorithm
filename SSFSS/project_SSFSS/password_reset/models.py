from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from datetime import timedelta


class PasswordResetCode(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    code = models.CharField(max_length=4)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

    def is_expired(self):
        # Check if the code has expired
        expiration_time = self.timestamp + timedelta(minutes=2)
        return timezone.now() > expiration_time
