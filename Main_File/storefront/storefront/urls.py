"""
URL configuration for storefront project.

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
    slug int str for dynamic links or urls
"""
from django.contrib import admin
from django.urls import path
from storefront import views

from . import views
from django.views.generic import TemplateView





urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    #path('', views.index, name='index'),
    path('admin/', admin.site.urls),\
    path('',views.dashboard),\
    path('login/',views.login),
    path('sign-up/',views.signup),
    path('contact/',views.contact),
    path('setting/',views.setting),
    path('files/',views.files),
    path('upload/',views.upload),
    path('encrypt/',views.enckey,name="key"),
    path('encdec/',views.encdec,name="encdec"),
    path('form/',views.get_name),
]
