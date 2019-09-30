from rest_framework import routers
from accounts import views as accounts_views

router = routers.DefaultRouter()
router.register(r'users', accounts_views.CustomUserViewset)
router.register(r'positions', accounts_views.PositionsViewset)

