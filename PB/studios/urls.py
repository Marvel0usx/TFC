from studios.views import studio
from studios.views import fitnessClass
from django.urls import path

app_name = 'studios'

urlpatterns = [
    path('<str:studio_id>/view/', studio.ViewStudio.as_view()),
    path('create/', studio.CreateStudio.as_view()),
    path('search/', studio.SearchStudio.as_view()),
    path('<str:studio_id>/edit/', studio.UpdateStudio.as_view()),
    path('<str:studio_id>/amenities/create/', studio.CreateAmenity.as_view()),
    path('<str:studio_id>/amenities/edit/', studio.UpdateAmenities.as_view()),
    path('<str:studio_id>/delete/', studio.DeleteStudio.as_view()),
    path('<str:studio_id>/schedule/', studio.StudioSchedule.as_view()),
    path('<str:studio_id>/class/list', fitnessClass.ListClasses.as_view()),
    path('<str:studio_id>/class/create/', fitnessClass.CreateClass.as_view()),
    path('class/<str:class_id>/view/', fitnessClass.ViewClass.as_view()),
    path('class/<str:class_id>/edit/', fitnessClass.UpdateClass.as_view()),
    path('class/<str:class_id>/cancel/single', fitnessClass.CancelClass.as_view()),
    path('class/<str:class_id>/cancel/all', fitnessClass.CancelRecurringClasses.as_view()),
    path('class/search/', fitnessClass.SearchClass.as_view()),
]