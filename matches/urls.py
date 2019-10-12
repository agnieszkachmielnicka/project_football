from django.urls import path, include
from matches.routers import router

app_name = 'matches'

urlpatterns = [
    path('api/', include(router.urls)),
]