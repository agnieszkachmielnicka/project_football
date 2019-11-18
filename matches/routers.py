from rest_framework import routers
from matches import views as matches_views

router = routers.DefaultRouter()
router.register(r'public_matches', matches_views.PublicMatchList, base_name="public_matches")
