from django.contrib import admin
from .models.studio import Studio
from .models.fitnessClass import FitnessClass
from .models.amenity import Amenity

# Register your models here.
admin.site.register(Studio)
admin.site.register(FitnessClass)
admin.site.register(Amenity)
