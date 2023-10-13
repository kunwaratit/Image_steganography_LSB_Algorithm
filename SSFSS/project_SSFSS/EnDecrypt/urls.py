# EnDecrypt

# urls.py
from django.urls import path
from . import views
from .views import get_user_encrypted_files
urlpatterns = [
    #  path('upload_and_encrypt/', views.upload_and_encrypt,name='upload_and_encrypt'),

    # ... other URL patterns ...
    path('upload/', views.upload_file, name='upload_file'),
    path('decrypt/', views.decrypt_file, name='decrypt_file'),
    path('download/<str:encrypted_file_id>/',
         views.download_encrypted_file, name='download_encrypted_file'),
    path('get_user_encrypted_files/', views.get_user_encrypted_files,
         name='get_user_encrypted_files'),

]
