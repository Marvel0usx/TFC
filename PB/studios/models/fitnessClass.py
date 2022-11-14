from django.db import models
from PB.studios.models.studio import Studio

class FitnessClass(models.Model):
    name = models.TextField()
    description = models.TextField()
    coach = models.TextField()
    keywords = models.TextField()
    capacity = models.PositiveIntegerField()
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    studio = models.ForeignKey(
        to=Studio,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.name} class taught by {self.coach} at {self.time}'