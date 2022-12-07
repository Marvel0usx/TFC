from django.db import models
from studios.models import studio

class FitnessClass(models.Model):
    name = models.TextField()
    description = models.TextField()
    coach = models.TextField()
    keywords = models.TextField()
    capacity = models.PositiveIntegerField(default=1)
    enrolled = models.PositiveIntegerField(default=0) # number of enrolled users, cannot exceed capacity
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    baseClass = models.IntegerField(blank=True, null=True) # for cancelling recurring classes
    studio = models.ForeignKey(
        to=studio.Studio,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.name} class taught by {self.coach} at {self.startTime}'

    
    # basically a primary key pair
    class Meta:
        unique_together = (('coach', 'startTime'),)