from django.db import models
from datetime import date


class User(models.Model):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user_id = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    date_of_birth = models.DateField()

    def __str__(self):
        return self.email
