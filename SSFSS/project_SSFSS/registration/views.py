# registration
# views.py

import re
import random
from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.middleware.csrf import get_token
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_protect
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from .serializers import UserSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .renderers import UserRenderer
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken


# Generate token manually

from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail  # Import send_mail
from django.core.mail import EmailMessage  # Import EmailMessage
from django.utils import timezone  # Import timezone
from .models import User
from .serializers import UserSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterAPI(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request):
        errors = server_side_validation(request.data)

        if errors:
            # If there are validation errors, return them as a response
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        # serializer = UserSerializer(data=request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            otp_code = str(random.randint(1000, 9999))

            # Save the OTP code in the database (you may need to add this field to your User model)
            print(otp_code)
            first_name = serializer.validated_data.get('first_name', '')
            phone_number = serializer.validated_data.get('phone_number', '')
            # No need to use strptime for date_of_birth, DRF handles it automatically.
            # It will be a date object after validation.

            # Generate the user_id using the first four digits of the phone number and first name.
            user_id = f"{first_name.lower()}{phone_number[-4:]}"
         #   random_number = random.randint(1000, 9999)

            # Send the random number via email
         #   email_subject = 'Registration Verification'
          #  email_message = f'Your verification code is: {random_number}'
          #  email = EmailMessage(email_subject, email_message, to=[user.email])
          #  email.send()
            email = serializer.validated_data.get('email')
            user = serializer.save(user_id=user_id, otp_code=otp_code)
            token = get_tokens_for_user(user)
            send_mail(
                'OTP Verification Code',
                f'Your OTP code is: {otp_code}',
                'atit.191508@ncit.edu.np',  # Replace with your email address
                ['atit.191508@ncit.edu.np'],
                fail_silently=False,
            )
            response_data = {
                'Token': token,
                'email': user.email,
                'user_id': user.user_id,
                'message': 'Registration successful'
            }

            return Response(response_data)
        else:
            return Response(serializer.errors, status=400)


class LoginAPI(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            print(f"User ID: {email}, Password: {password}")

            authenticated_user = authenticate(
                email=email, password=password)

            if authenticated_user is not None:
                # Check if the user already has an active session
             #       existing_session = UserSession.objects.filter(user=authenticated_user, is_logged_in=True).first()
             #       if existing_session:
                # User is already logged in; prevent login
              #          return Response({'error': 'User is already logged in'}, status=status.HTTP_400_BAD_REQUEST)

                # Create a new session record
             #       user_session = UserSession(user=authenticated_user, login_time=timezone.now())
             #       user_session.save()

                print("Authentication successful")
                token = get_tokens_for_user(authenticated_user)
                response_data = {
                    'Token': token,
                    'id': authenticated_user.id,
                    'email': authenticated_user.email,
                    'user_id': authenticated_user.user_id,
                    'message': 'Login successful'

                }
                return Response(response_data)
            else:
                return Response({'error': 'Invalid user ID or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


# from .models import UserSession
# views.py or a separate validation module


def server_side_validation(data):
    errors = {}
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    password_pattern = r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$"

    if not data.get('first_name'):
        errors['first_name'] = "Name should not be empty"

    if not data.get('phone_number'):
        errors['phone_number'] = "Phone number should not be empty"
    elif not re.match(r"^\d{10}$", data.get('phone_number')):
        errors['phone_number'] = "Phone number must be 10 digits long"

    if not data.get('email'):
        errors['email'] = "Email should not be empty"
    elif not re.match(email_pattern, data.get('email')):
        errors['email'] = "Email should be valid"

    if not data.get('password'):
        errors['password'] = "Password should not be empty"
    elif len(data.get('password')) < 8:
        errors['password'] = "Password must be at least 8 characters long"
    elif not re.match(password_pattern, data.get('password')):
        errors['password'] = "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"

    if data.get('password') != data.get('confirmpassword'):
        errors['confirmpassword'] = "Password didn't match"

    return errors


def get_csrf_token(request):
    # Get the CSRF token
    csrf_token = get_token(request)

    # Set the CSRF token in a cookie
    response = JsonResponse({'csrf_token': csrf_token})
    response.set_cookie('csrftoken', csrf_token)

    return response


class LogoutAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if not isinstance(request.user, AnonymousUser):
            # Delete the user's authentication token to log them out
            # request.auth.delete()
            # token = request.META['HTTP_AUTHORIZATION']
            # print(token)
            # Update the UserSession to mark the user as logged out
            Token.objects.filter(user=request.user).delete()

        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@csrf_protect
def logout_view(request):
    logout(request)

    # Update the UserSession to mark the user as logged out

    return JsonResponse({'message': 'Logged out successfully.'})
