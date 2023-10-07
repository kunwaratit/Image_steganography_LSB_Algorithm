# models.py

from django.db import models


class EncodedImage(models.Model):
    image = models.ImageField(upload_to='images/stego/')
    hidden_data = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Encoded Image {self.pk}"
