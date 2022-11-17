from django.db import models
import math

# TODO: implement images correctly
class Studio(models.Model):
    name = models.TextField()
    address = models.TextField()
    locationX = models.FloatField(default=0)
    locationY = models.FloatField(default=0)
    postalCode = models.TextField()
    phoneNumber = models.TextField()
    images = models.ImageField(blank=True, null=True) # need to install pillow, can only be accessed through admin panel

    def __str__(self):
        return f'Studio {self.name} located at {self.address}'


    def distance(self, x, y):
        return math.sqrt(math.pow(self.locationX-x, 2)+math.pow(self.locationY-y, 2))