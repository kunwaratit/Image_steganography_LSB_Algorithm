# myapp/views.py (replace 'myapp' with your app's name)

from django.http import HttpResponseBadRequest, HttpResponseServerError, FileResponse
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from .decryptor import Decryptor
import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import EncryptedFile


from .encryptor import Encryptor

import os
import binascii


@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return HttpResponseBadRequest('No file provided')

        if uploaded_file:
            # Generate a random encryption key (you may change this as needed)
            key = os.urandom(16)
          #  key = key.decode('utf-8')
            # Convert bytes to hexadecimal string
            key_hex = binascii.hexlify(key).decode('utf-8')
            print(key)
            try:
                # Initialize the Encryptor with the key
                enc = Encryptor(key)

                # Encrypt the uploaded file and get the path to the encrypted file
                encrypted_file_path = enc.encrypt_file(uploaded_file)
                encrypted_file = EncryptedFile.objects.create(
                    encrypted_file=encrypted_file_path,
                    original_file_name=uploaded_file.name,
                    encryption_key=key
                )
                # Return the path to the encrypted file as a response
                response_data = {
                    'encrypted_file': encrypted_file.encrypted_file.url,
                    #        'encryption_key': key  # Include the key in the response
                    'encryption_key': key_hex  # Include the hexadecimal key in the response

                }
                return JsonResponse(response_data)
            except Exception as e:
                return HttpResponseBadRequest('Error during encryption: {}'.format(str(e)))
    return JsonResponse({'error': 'Invalid request'})


@csrf_exempt
def decrypt_file(request):
    if request.method == 'POST':
        encryption_key = request.POST.get('encryption_key')
        encrypted_file_id = request.POST.get('encrypted_file_id')
        if not encrypted_file_id:
            return HttpResponseBadRequest('Missing encrypted file ID')

        if not encryption_key:
            return HttpResponseBadRequest('Missing encryption key ')

        try:
            encrypted_file = EncryptedFile.objects.get(id=encrypted_file_id)

            if encrypted_file.encryption_key != encryption_key:
                return HttpResponseBadRequest('Invalid encryption key')

            decryptor = Decryptor(encryption_key)
            decrypted_file_path = decryptor.decrypt_file(
                encrypted_file.encrypted_file.path)

            # Serve the decrypted file for download
            with open(decrypted_file_path, 'rb') as decrypted_file:
                response = FileResponse(decrypted_file)
                response[
                    'Content-Disposition'] = f'attachment; filename="{os.path.basename(decrypted_file_path)}"'
                return response

        except ObjectDoesNotExist:
            return HttpResponseBadRequest('Encrypted file not found')
        except Exception as e:
            return HttpResponseServerError(f'Error during decryption: {str(e)}')

    return HttpResponseBadRequest('Invalid request')
