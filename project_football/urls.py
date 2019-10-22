"""project_football URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/login/', LoginView.as_view(), name="rest_login"),
    path('rest-auth/registration/', RegisterView.as_view(), name="rest_register"),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('matches/', include('matches.urls')),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
]
