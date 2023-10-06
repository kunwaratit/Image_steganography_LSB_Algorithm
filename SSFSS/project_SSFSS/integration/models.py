import uuid
from django.conf import settings
from django.contrib.auth.models import User

from django.db import models


class EncryptedFile(models.Model):
    encrypted_file = models.FileField(upload_to='encrypted_files/')
    original_file_name = models.CharField(max_length=255)
    encryption_key = models.CharField(max_length=255)
    encrypted_file_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
