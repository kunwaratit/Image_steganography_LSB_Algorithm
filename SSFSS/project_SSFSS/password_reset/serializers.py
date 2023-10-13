# serializers.py
from rest_framework import serializers
from .models import PasswordResetCode


class PasswordResetCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetCode
        fields = '__all__'
