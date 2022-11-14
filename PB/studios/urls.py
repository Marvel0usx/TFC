from PB.studios.views.studio import StudioView
from PB.studios.views.fitnessClass import FitnessClassView
from django.urls import path

app_name = 'studios'

urlpatterns = [
    path('studio/view/<str:studio_id/', StudioView.as_view(), name="view-studio"),
    path('class/view/<str:class_id/', FitnessClassView.as_view(), name="view-class"),
]