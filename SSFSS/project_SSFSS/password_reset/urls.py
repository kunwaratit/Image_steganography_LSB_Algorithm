# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/send-reset-code/', views.send_reset_code, name='send-reset-code'),
    path('api/verify-reset-code/', views.verify_reset_code,
         name='verify-reset-code'),
    path('api/reset-password/', views.reset_password, name='reset-password'),
    # Add other API URLs here (login, registration, etc.)
]
