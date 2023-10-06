#registration
# views.py

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

from rest_framework_simplejwt.tokens import RefreshToken

from django.utils import timezone

# Generate token manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterAPI(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data.get('first_name', '')
            phone_number = serializer.validated_data.get('phone_number', '')
            # No need to use strptime for date_of_birth, DRF handles it automatically.
            # It will be a date object after validation.

            # Generate the user_id using the first four digits of the phone number and first name.
            user_id = f"{first_name.lower()}{phone_number[-4:]}"

            user = serializer.save(user_id=user_id)
            token = get_tokens_for_user(user)
            return Response({'Token': token, 'message': 'Registration successful'})
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
                return Response({'Token': token, 'message': 'Login successful'})
            else:
                # Authentication failed
                print("Authentication failed")
                return Response({'error': 'Invalid user ID or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


# from .models import UserSession


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
