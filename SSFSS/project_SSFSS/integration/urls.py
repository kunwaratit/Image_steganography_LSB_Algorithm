from django.urls import path
from . import views

urlpatterns = [
    path('list-encrypted-files/', views.list_user_encrypted_files,
         name='list-encrypted-files'),
    path('upload-and-encrypt-file/', views.upload_and_encrypt_file,
         name='upload-and-encrypt-file'),
]
