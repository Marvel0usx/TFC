from studios.views.studio import ViewStudio, CreateStudio
from studios.views.fitnessClass import ViewClass
from django.urls import path

app_name = 'studios'

urlpatterns = [
    path('<str:studio_id>/view/', ViewStudio.as_view()),
    path('create/', CreateStudio.as_view()),
    path('class/<str:class_id>/view/', ViewClass.as_view()),
]