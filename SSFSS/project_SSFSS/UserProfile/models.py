# userprofile/models.py
from django.db import models
from registration.models import User
from EnDecrypt.models import EncryptedFile


class UserProfile(models.Model):
    # Fields from the User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    profile_user_id = models.CharField(
        max_length=30, unique=True, blank=True, null=True)

    # Fields from the EncryptedFile model
    encrypted_files = models.ManyToManyField(
        EncryptedFile, related_name='user_profiles')

    def __str__(self):
        return self.user.email
