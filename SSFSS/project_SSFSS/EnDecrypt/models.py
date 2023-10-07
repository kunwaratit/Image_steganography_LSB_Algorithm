# EnDecrypt
# models.py
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models
import uuid
import os
# Import the settings module to access AUTH_USER_MODEL
from django.conf import settings


def encrypted_file_path(instance, filename):
    # The instance parameter is an instance of EncryptedFile model.
    # This function generates a unique file path for each encrypted file.
    return os.path.join('media', 'encrypted_files', filename)


class EncryptedFile(models.Model):

    id = models.AutoField(primary_key=True)
    encrypted_file = models.FileField(upload_to='encrypted_files/')
    original_file_name = models.CharField(max_length=255)
    encryption_key = models.CharField(max_length=255)
    # Unique identifier for the encrypted file
    encrypted_file_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return self.original_file_name


def decrypted_file_path(instance, filename):
    # The instance parameter is an instance of DecryptedFile model.
    # This function generates a unique file path for each decrypted file.
    return os.path.join('media', 'decrypted_files', filename)


class DecryptedFile(models.Model):
    decrypted_file = models.FileField(upload_to=decrypted_file_path)
    original_encrypted_file = models.ForeignKey(
        EncryptedFile, on_delete=models.CASCADE)
    decryption_key = models.CharField(max_length=255)
    decrypted_file_id = models.UUIDField(
        unique=True, editable=False, default=uuid.uuid4)

    def __str__(self):
        return f"Decrypted {self.original_encrypted_file.original_file_name}"
