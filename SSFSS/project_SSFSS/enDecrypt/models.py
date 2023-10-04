from django.db import models


class EncryptedFile(models.Model):
    encrypted_file = models.FileField(upload_to='encrypted_files/')
    original_file_name = models.CharField(max_length=255)
    encryption_key = models.CharField(max_length=255)

    def __str__(self):
        return self.original_file_name
