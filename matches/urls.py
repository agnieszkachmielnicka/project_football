from django.urls import path, include
from matches.routers import router
from matches import views

app_name = 'matches'

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/matches/', views.MatchViewset.as_view()),
    path('api/matches/<int:pk>/', views.MatchDetail.as_view()),
]