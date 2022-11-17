from django.db import models

# TODO: implement images correctly
class Studio(models.Model):
    name = models.TextField()
    address = models.TextField()
    location = models.TextField()
    postalCode = models.TextField()
    phoneNumber = models.TextField()
    images = models.ImageField(blank=True, null=True) # need to install pillow, can only be accessed through admin panel

    def __str__(self):
        return f'Studio {self.name} located at {self.address}, {self.location}.'


