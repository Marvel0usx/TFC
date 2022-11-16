from django.db import models
from PB.studios.models.fitnessClass import FitnessClass
from PB.payment.models import CardInfo
from PB.payment.models import Subscriptions

from PB.accounts.models.account import Account


class UserAccount(Account):
    credit_card = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    fitness_class = models.ManyToManyField(FitnessClass, on_delete=models.CASCADE)
    subscription_plan = models.ForeignKey(Subscriptions, on_delete=models.CASCADE)

    def __str__(self):
        return f'UserAccount {self.first_name}, {self.last_name}.'

    # TODO: methods
    def edit_profile(self):
        pass

    def get_closest_studios(self):
        pass

    def get_list_of_class(self):
        return self.fitness_class.all()

    def enroll_class(self):
        pass

    def drop_classes(self):
        pass

    def search_studio(self):
        pass

    def search_class(self):
        pass

    def see_payment_history(self):
        pass

    def see_current_subscription(self):
        return self.subscription_plan

    def edit_subscription(self):
        pass

