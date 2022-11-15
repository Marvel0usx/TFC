
from PB.studios.models.fitnessClass import FitnessClass
from PB.studios.models.studios import Studio
from PB.payment.models.subscription import Subscription

from PB.accounts.models.account import Account


class AdminAccount(Account):

    def __str__(self):
        return f'AdminAccount {self.first_name}, {self.last_name}.'

    def create_studio(self):
        pass

    def update_studio(self):
        pass

    def delete_studio(self):
        pass

    def update_amenities(self):
        pass

    def create_class(self):
        pass

    def update_class(self):
        pass

    def cancel_class(self):
        pass

    def create_subscription(self):
        pass

    def edit_subscription(self):
        pass

    def delete_subscription(self):
        pass
