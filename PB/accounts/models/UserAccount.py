from django.contrib.auth.models import User, UserManager
from django.db import models
from studios.models.fitnessClass import FitnessClass
from payment.models import CardInfo
from payment.models import Subscriptions

from accounts.models.account import Account


class UserAccount(models.Model):
    objects = UserManager()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.TextField()
    avatar = models.ImageField()
    credit_card = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    fitness_class = models.ManyToManyField(FitnessClass)
    subscription_plan = models.ForeignKey(Subscriptions, on_delete=models.CASCADE)

    def __str__(self):
        return f'Username: {self.username}.'

