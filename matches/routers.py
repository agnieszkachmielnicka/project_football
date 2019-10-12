from rest_framework import routers
from matches import views as matches_views

router = routers.DefaultRouter()
router.register(r'matches', matches_views.MatchViewset)
