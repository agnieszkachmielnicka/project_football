from django.urls import path, include
from accounts.routers import router

app_name = 'accounts'

urlpatterns = [
    path('api/', include(router.urls)),
]