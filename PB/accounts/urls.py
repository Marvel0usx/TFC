from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *
from rest_framework.authtoken import views
from .router import router

app_name = 'account'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update_profile/<int:pk>/', UserAccountUpdateView.as_view(), name='auth_update_profile'),
    path('logout/', LogoutView.as_view(), name='token_logout')
]