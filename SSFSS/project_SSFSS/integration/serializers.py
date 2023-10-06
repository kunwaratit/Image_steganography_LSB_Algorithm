from rest_framework import serializers
from .models import EncryptedFile


class EncryptedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncryptedFile
        fields = '__all__'
