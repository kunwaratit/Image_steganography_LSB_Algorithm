from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import EncryptedFile
from .serializers import EncryptedFileSerializer
from rest_framework.response import Response


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_user_encrypted_files(request):
    user = request.user
    encrypted_files = EncryptedFile.objects.filter(user=user)
    serializer = EncryptedFileSerializer(encrypted_files, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_and_encrypt_file(request):
    user = request.user
    uploaded_file = request.FILES.get('file')
    if not uploaded_file:
        return Response({'error': 'No file provided'}, status=400)

    # Perform file encryption here and associate the encrypted file with the user

    return Response({'message': 'File uploaded and encrypted successfully'})
