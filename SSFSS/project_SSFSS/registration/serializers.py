# registration/serializers.py
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.SerializerMethodField(read_only=True)
    otp_code = serializers.CharField(
        allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = User
        fields = ('email', 'phone_number',
                  'first_name', 'last_name', 'user_id', 'password', 'otp_code')
        # As user_id is unique and autogenerated, we don't want it to be writable.
        extra_kwargs = {'user_id': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number']
        )
        return user

    def get_user_id(self, obj):
        # Generate the user_id based on first_name and last four numbers
        if obj.first_name and obj.phone_number:
            return f"{obj.first_name.lower().replace(' ', '')}_{obj.phone_number[-4:]}"
        return None


class LoginSerializer(serializers.ModelSerializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password',]
