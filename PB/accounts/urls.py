from django.urls import path, include
from .views import *
from rest_framework.authtoken import views
from .router import router

app_name = 'account'

urlpatterns = [
    path('api-token-auth/', views.obtain_auth_token),
    path('', include(router.urls)),
]