# EnDecrypt

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    #  path('upload_and_encrypt/', views.upload_and_encrypt,name='upload_and_encrypt'),

    # ... other URL patterns ...
    path('upload/', views.upload_file, name='upload_file'),
    path('decrypt/', views.decrypt_file, name='decrypt_file'),
]
