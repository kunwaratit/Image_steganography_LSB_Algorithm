# stego_app/views.py

from rest_framework.response import Response
import numpy as np
from .serializers import ImageUploadSerializer
import os
import cv2
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .utils import msgtobinary


from .models import EncodedImage


@api_view(['POST'])
def encode_file_into_image(request):
    file = request.FILES.get('file', None)
    # Replace with the path to your image
    image_path = os.path.join(settings.MEDIA_ROOT, 'images/stego/UCD.png')

    def encode_file(file, image_path):
        image = cv2.imread(image_path)

        # Check if the image was loaded successfully
        if image is None:
            raise ValueError("Image not found at the specified path")

        # Calculate the maximum bytes that can be encoded in the image
        no_of_bytes = (image.shape[0] * image.shape[1] * 3) // 8

        # Check if the file can fit within the image
        if file.size > no_of_bytes:
            raise ValueError(
                "Insufficient space in the image to encode the file")

        # Read the file binary
        file_data = file.read()

        # Add a delimiter to mark the end of the file
        file_data += b'*^*^*'

        # Convert file binary to binary string
        binary_data = ''.join(format(byte, "08b") for byte in file_data)
        length_data = len(binary_data)

        # Initialize data index
        index_data = 0

        # Loop through image pixels and encode the binary data
        for i in image:
            for pixel in i:
                r, g, b = msgtobinary(pixel)
                if index_data < length_data:
                    pixel[0] = int(r[:-1] + binary_data[index_data], 2)
                    index_data += 1
                if index_data < length_data:
                    pixel[1] = int(g[:-1] + binary_data[index_data], 2)
                    index_data += 1
                if index_data < length_data:
                    pixel[2] = int(b[:-1] + binary_data[index_data], 2)
                    index_data += 1
                if index_data >= length_data:
                    break

        # Save the stego image with a new name
        stego_image_path = 'stego_' + os.path.basename(image_path)
        cv2.imwrite(stego_image_path, image)

        # Save the encoded image as a file
        encoded_image_file = open(stego_image_path, 'wb')
        encoded_image_file.write(file_data)
        encoded_image_file.close()

        return stego_image_path

    try:
        stego_image_path = encode_file(file, image_path)
        encoded_image = EncodedImage(
            image=stego_image_path, hidden_data="Your Hidden Data Here")
        encoded_image.save()
        response_data = {
            'message': 'File encoded successfully.',
            'stego_image_path': stego_image_path
        }
        return JsonResponse(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return JsonResponse(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# stego_app/views.py


def decode_img_data(image):
    data_binary = ""
    for i in image:
        for pixel in i:
            r, g, b = msgtobinary(pixel)
            data_binary += r[-1]
            data_binary += g[-1]
            data_binary += b[-1]
            total_bytes = [data_binary[i: i+8]
                           for i in range(0, len(data_binary), 8)]
            decoded_data = ""
            for byte in total_bytes:
                decoded_data += chr(int(byte, 2))
                if decoded_data[-5:] == "*^*^*":
                    return decoded_data[:-5]


@api_view(['POST'])
def decode_text_from_image(request):
    serializer = ImageUploadSerializer(data=request.data)
    if serializer.is_valid():
        image_file = serializer.validated_data['image_file']

        try:
            image_data = image_file.read()
            image = cv2.imdecode(np.frombuffer(
                image_data, np.uint8), cv2.IMREAD_COLOR)

            decoded_message = decode_img_data(image)

            if decoded_message:
                return Response({'message': 'Text decoded successfully.', 'decoded_text': decoded_message})
            else:
                return Response({'message': 'No hidden text found in the image.'}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
