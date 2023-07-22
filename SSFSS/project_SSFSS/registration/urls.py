# registration/urls.py
from django.urls import path
from .views import RegisterAPI, LoginAPI
from django.contrib.auth.models import User


urlpatterns = [
    # Use the corrected class name here
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),

]
