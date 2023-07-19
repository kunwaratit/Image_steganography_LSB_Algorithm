from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer


class RegisterAPI(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data.get('first_name', '')
            phone_number = serializer.validated_data.get('phone_number', '')

            # Generate the user_id using the first four digits of the phone number and first name.
            user_id = f"{first_name.lower()}{phone_number[-4:]}"

            serializer.save(user_id=user_id)
            return Response({'message': 'Registration successful'})
        else:
            return Response(serializer.errors, status=400)
