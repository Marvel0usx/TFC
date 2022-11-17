from .views import UserAccountUpdateViewsets, AdminAccountUpdateViewsets
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', userviewsets)
router.register('user', userviewsets)
