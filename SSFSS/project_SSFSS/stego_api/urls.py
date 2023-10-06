# stego_api/urls.py

from django.urls import path
from .views import encode_file_into_image, decode_text_from_image

urlpatterns = [
    path('encode/', encode_file_into_image, name='encode-file-into-image'),
    path('decode/', decode_text_from_image, name='decode-image'),
]
