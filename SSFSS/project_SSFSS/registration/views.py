# views.py
from .serializers import UserSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .renderers import UserRenderer

from rest_framework_simplejwt.tokens import RefreshToken

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
                # Authentication successful

                print("Authentication successful")
                token = get_tokens_for_user(authenticated_user)
                return Response({'Token': token, 'message': 'Login successful'})
            else:
                # Authentication failed
                print("Authentication failed")
                return Response({'error': 'Invalid user ID or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect
class LogoutAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Simply delete the token to force a logout
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
from django.contrib.auth import logout
from django.http import JsonResponse
@csrf_protect
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully.'})