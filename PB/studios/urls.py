from studios.views.studio import ViewStudio, CreateStudio
from studios.views.fitnessClass import ViewClass
from django.urls import path

app_name = 'studios'

urlpatterns = [
    path('studio/view/<str:studio_id/', ViewStudio.as_view(), name='view-studio'),
    path('studio/create', CreateStudio.as_view(), name='create-studio'),
    path('class/view/<str:class_id/', ViewClass.as_view(), name='view-class'),
]