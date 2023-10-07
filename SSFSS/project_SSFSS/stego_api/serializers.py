# stego_api/serializers.py
from rest_framework import serializers


class ImageStegoSerializer(serializers.Serializer):
    image_file = serializers.FileField()
    data = serializers.CharField()

class ImageUploadSerializer(serializers.Serializer):
    image_file = serializers.ImageField()