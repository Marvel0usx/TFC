from django.db import models
from PB.studios.models.fitnessClass import FitnessClass
from django.utils import timezone
from PB.studios.serializers import 

# TODO: implement images correctly
class Studio(models.Model):
    name = models.TextField()
    address = models.TextField()
    location = models.TextField()
    postalCode = models.TextField()
    phoneNumber = models.TextField()
    images = models.TextField()



    def __str__(self):
        return f'Studio {self.name} located at {self.address}, {self.location}.'


    # implement get_info in view

    
    def create_schedule(self):
        """Returns a queryset of the classes that have yet to start."""
        return FitnessClass.objects.get_queryset(studio=self.id, startTime__gt=timezone.now())

