# registration/urls.py
from django.urls import path
from .views import RegisterAPI

urlpatterns = [
    # Use the corrected class name here
    path('register/',RegisterAPI.as_view(), name='register'),
]
