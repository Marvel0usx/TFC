from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE, SET_NULL


try:
    from PB.PB.settings import MAX_LENGTH
except ImportError:
    MAX_LENGTH = 250


class SubscriptionPlans(models.Model):
    """
    Table of subscription plans for TFC. **THIS IS DIFFERENT FROM THE SUBSCRIPTIONS BELOW.
    """
    name = models.CharField(max_length=MAX_LENGTH)
    description = models.CharField(max_length=MAX_LENGTH)
    price = models.FloatField(blank=False)
    # indicated that this plan is active
    is_live = models.BooleanField(default=True)
    is_monthly = models.BooleanField(default=True)


class Subscriptions(models.Model):
    """
    Table of all subscriptions made by users in TFC. To query recurring subscriptions,
    filter by the current time onward.
    """
    # ForeignKey relation to User so that we can easily retrieve all subscription plans
    # for a certain user.
    user = models.ForeignKey(to=User, related_name="subscription_record", on_delete=CASCADE)
    subscription = models.ForeignKey(to=SubscriptionPlans, related_name="subscription_record", on_delete=CASCADE)
    date_time = models.DateTimeField(auto_now=True)


class Payment(models.Model):
    """
    Payment records for the users of TFC according to the subscription plan.

    """
    # never delete a payment record on cascade. we need the users or *police officers* to be able to trace transactions.
    user = models.ForeignKey(to=User, related_name="payment", null=True, on_delete=SET_NULL)
    subscription = models.ForeignKey(to=SubscriptionPlans, related_name="payment", null=True, on_delete=SET_NULL)
    amount = models.FloatField(null=False, blank=False)
    date_time = models.DateTimeField(auto_now=True)
    card_number = models.PositiveIntegerField(blank=False)
    card_expiration_date = models.DateField(blank=False)
    card_holder = models.CharField(max_length=MAX_LENGTH, blank=False)
