from django.db import models
from studios.models.studio import Studio



class Amenity(models.Model):
    type = models.TextField()
    quantity = models.PositiveIntegerField()
    studio = models.ForeignKey(
        to=Studio,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f'Amenity type: {self.type}\n Quantity: {self.quantity}\n Studio: {self.studio}'
    
    class Meta:
        unique_together = (('type', 'studio'),)