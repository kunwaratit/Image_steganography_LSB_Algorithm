# registration/urls.py
from django.urls import path
from .views import RegisterAPI, LoginAPI
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
# Custom LogoutView
from . import views
urlpatterns = [
    # Use the corrected class name here
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
     path('logout/', views.logout_view, name='logout'),

]
