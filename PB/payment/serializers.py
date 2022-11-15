from rest_framework.serializers import ModelSerializer
from .models import *


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ["amount", "subscription", "date_time", "card_number"]


class CardInfoSerializer(ModelSerializer):
    class Meta:
        model = CardInfo
        fields = ["card_number", "card_expiration_date", "card_holder_firstname", "card_holder_lastname"]


class SubscriptionPlansSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = ["name", "description", "price", "is_live", "is_monthly"]


class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = ["subscription", "date_time"]
