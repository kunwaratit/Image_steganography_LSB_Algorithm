# views.py
from rest_framework.permissions import IsAuthenticated
import random
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import PasswordResetCode
from .serializers import PasswordResetCodeSerializer

from registration.models import User

from django.utils import timezone
from datetime import timedelta


@api_view(['POST'])
@permission_classes([AllowAny])
def send_reset_code(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Generate a random 4-digit code and save it to the database
    code = str(random.randint(1000, 9999))
    reset_code = PasswordResetCode(user=user, code=code)
    print(reset_code)
    reset_code.save()

    # Send the code to the user's email
    send_mail(
        'Password Reset Code',
        f'Your password reset code is: {code}',
        'atit.191508@ncit.edu.np',
        [email],
        fail_silently=False,
    )
    return Response({'message': 'Code sent successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_reset_code(request):
    email = request.data.get('email')
    code = request.data.get('code')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        reset_code = PasswordResetCode.objects.get(user=user, code=code)
    except PasswordResetCode.DoesNotExist:
        return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)

    if reset_code.is_expired():
        reset_code.delete()
        return Response({'error': 'Expired code'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the code is still valid (e.g., within a certain time limit)
    reset_code.delete()
    return Response({'message': 'Code verified successfully'}, status=status.HTTP_200_OK)
# views.py


@api_view(['POST'])
# You can use a different permission class if needed
# @permission_classes([IsAuthenticated])
def reset_password(request):
    email = request.data.get('email')
    new_password = request.data.get('new_password')
    print(new_password)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update the user's password
    password = user.set_password(new_password)
    print(password)
    print(new_password)
    user.save()

    return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
