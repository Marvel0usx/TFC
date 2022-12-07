from django.contrib.auth.models import AbstractUser
from django.db import models
from studios.models.fitnessClass import FitnessClass
from payment.models import CardInfo
from payment.models import Subscriptions


class UserAccount(AbstractUser):
    phone_number = models.TextField()
    avatar = models.ImageField()
    credit_card = models.ForeignKey(CardInfo, on_delete=models.CASCADE, null=True, blank=True, default=None)
    fitness_class = models.ManyToManyField(FitnessClass, default=None)
    subscription_plan = models.ForeignKey(Subscriptions, on_delete=models.CASCADE, null=True, blank=True, default=None)

    def __str__(self):
        return f'Username: {self.username}.'

    class Meta:
        pass
