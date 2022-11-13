from django.db import models
<<<<<<< HEAD
from PB.studios.models.fitnessClass import FitnessClass

# TODO: implement images correctly
=======


>>>>>>> 00f0b779dcf64491cb00d419fab9a8fafeafe77e
class Studio(models.Model):
    name = models.TextField()
    address = models.TextField()
    location = models.TextField()
    postalCode = models.TextField()
    phoneNumber = models.TextField()
    images = models.TextField()

<<<<<<< HEAD


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
=======
    def __str__(self):
        return f'Studio {self.name} located at {self.address}, {self.location}.'
>>>>>>> 00f0b779dcf64491cb00d419fab9a8fafeafe77e
