from django.db import models

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


