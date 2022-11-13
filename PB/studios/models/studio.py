from django.db import models
from PB.studios.models.fitnessClass import FitnessClass

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



    def get_info(self):
        return {
            'name': self.name, 
            'address': self.address, 
            'location': self.location,
            'postalCode': self.postalCode,
            'phoneNumber': self.phoneNumber,
            'images': self.images,
        }


    # TODO
    def create_schedule(self):
        pass