from django.contrib import admin
from .models.studio import Studio
from .models.fitnessClass import FitnessClass
from .models.amenity import Amenity

# Register your models here.
class StudioAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phoneNumber', 'address', 'location']
    
class ClassAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'studio', 'coach', 'startTime', 'endTime', 'capacity', 'enrolled', 'baseClass']
    
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['id', 'studio', 'type', 'quantity']
    
admin.site.register(Studio, StudioAdmin)
admin.site.register(FitnessClass, ClassAdmin)
admin.site.register(Amenity, AmenityAdmin)