# stego_app/views.py

import os
import cv2
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .utils import msgtobinary

import os
import cv2
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status


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
        response_data = {
            'message': 'File encoded successfully.',
            'stego_image_path': stego_image_path
        }
        return JsonResponse(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return JsonResponse(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def decode_text_from_image(request):
    stego_image_path = os.path.join(
        settings.MEDIA_ROOT, 'images/stego/UCD.png')

    # Function to decode text from an image
    def decode_text(stego_image_path):
        if not os.path.exists(stego_image_path):
            raise ValueError("Stego image not found at the specified path")

        stego_image = cv2.imread(stego_image_path)

        # Check if the stego image was loaded successfully
        if stego_image is None:
            raise ValueError("Error loading the stego image")

        # Initialize data index and binary data
        binary_data = ""
        delimiter = "*^*^*"

        # Loop through stego image pixels and extract the LSBs
        for i in stego_image:
            for pixel in i:
                r, g, b = msgtobinary(pixel)
                binary_data += r[-1]
                binary_data += g[-1]
                binary_data += b[-1]

                # Check for the delimiter to mark the end of data
                if binary_data.endswith(delimiter):
                    binary_data = binary_data[:-len(delimiter)]
                    break

        # Convert binary data to text
        decoded_text = ""
        total_bytes = [binary_data[i:i+8]
                       for i in range(0, len(binary_data), 8)]
        for byte in total_bytes:
            decoded_text += chr(int(byte, 2))  # Convert binary to integer here

        return decoded_text

    try:
        decoded_text = decode_text(stego_image_path)
        response_data = {
            'message': 'Text decoded successfully.',
            'decoded_text': decoded_text
        }
        return JsonResponse(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'error': str(e)}
        return JsonResponse(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
