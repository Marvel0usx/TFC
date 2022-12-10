from studios.views import studio
from studios.views import fitnessClass
from django.urls import path

app_name = 'studios'

urlpatterns = [
    path('<str:studio_id>/view/', studio.ViewStudio.as_view()),                             # users
    path('<str:studio_id>/view/mylocation=<str:x>,<str:y>', studio.ViewStudio.as_view()),   # users
    path('search/', studio.SearchStudio.as_view()),                                         # users
    path('list/mylocation=<str:x>,<str:y>', studio.ListClosestStudios.as_view()),           # users        
    path('<str:studio_id>/schedule/', studio.StudioSchedule.as_view()),                     # users                
    path('<str:studio_id>/class/list/', fitnessClass.ListClasses.as_view()),                 # users
    path('class/<str:class_id>/view/', fitnessClass.ViewClass.as_view()),                   # users                              
    path('class/search/', fitnessClass.SearchClass.as_view()),                              # users
    path('class/<str:class_id>/enroll_<str:mode>', fitnessClass.EnrollClass.as_view()),     # users
    path('class/<str:class_id>/drop_<str:mode>', fitnessClass.DropClass.as_view()),         # users
    path('my_schedule/', fitnessClass.ViewSchedule.as_view()),     # users
    path('my_history/', fitnessClass.ViewHistory.as_view()),         # users     
    path('<str:studio_id>/amenities/list/', studio.AmenitiesList.as_view()),                # for frontend                      
]



#useless admin stuff
#path('create/', studio.CreateStudio.as_view()),                                         # admins
#path('<str:studio_id>/edit/', studio.UpdateStudio.as_view()),                           # admins
#path('<str:studio_id>/delete/', studio.DeleteStudio.as_view()),                         # admins 
#path('<str:studio_id>/amenities/create/', studio.CreateAmenity.as_view()),              # admins 
#path('amenities/edit/<str:amenity_id>/', studio.UpdateAmenity.as_view()),               # admins  
#path('<str:studio_id>/class/create/', fitnessClass.CreateClass.as_view()),              # admins                             
#path('class/<str:class_id>/edit/', fitnessClass.UpdateClass.as_view()),                 # admins                              
#path('class/<str:class_id>/cancel/single', fitnessClass.CancelClass.as_view()),         # admins                                  
#path('class/<str:class_id>/cancel/all', fitnessClass.CancelRecurringClasses.as_view()), # admins       