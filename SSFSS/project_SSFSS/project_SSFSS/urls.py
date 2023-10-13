"""
URL configuration for project_SSFSS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from xml.etree.ElementInclude import include
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path as url
from rest_framework import routers

# route = routers.DefaultRouter()
# route.register("", ReactView, basename="appview")

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('registration.urls')),
    path('app/', include('EnDecrypt.urls')),
    path('stego_app/', include('stego_api.urls')),
    path('integration/', include('integration.urls')),
    path('userprofile/', include('UserProfile.urls')),
    path('forget_password/', include('password_reset.urls')),
]
