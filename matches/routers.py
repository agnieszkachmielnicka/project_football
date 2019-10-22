from rest_framework import routers
from matches import views as matches_views

router = routers.DefaultRouter()
router.register(r'matches', matches_views.MatchViewset, base_name="matches")
router.register(r'public_matches', matches_views.PublicMatchList, base_name="public_matches")
