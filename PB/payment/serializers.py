from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
from .models import *


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "user_id", "subsciprion_id", "amount", "date_time",
        "card_number", "card_expiration_date", "card_holder_firstname",
        "card_holder_lastname"]

    def validate(self, attrs):
        errors = []
        if attrs["amount"] < 0:
            errors.append({"amount": "Amount must be a non-negative number."})
        subscription_id = int(attrs["subscription_id"])
        if Subscriptions.objects.get(id=subscription_id) is None:
            errors.append({"subscription_id": "Invalid subscription plan."})
        if not attrs["card_number"].isnumeric():
            errors.append({"card_number": "Card number contains invalid characters."})
        if errors:
            raise ValidationError(errors)
        else:
            return attrs


class CardInfoSerializer(ModelSerializer):
    class Meta:
        model = CardInfo
        fields = ["id", "user_id", "card_number", "card_expiration_date", "card_holder_firstname",
        "card_holder_lastname"]

    def validate(self, attrs):
        errors = []
        if not User.object.filter(id=attrs["user_id"]).exists():
            errors.append({"user_id": "User does not exist."})

        if not attrs["card_number"].isnumeric():
            errors.append({"card_number": "Card number contains invalid characters."})

        if attrs["card_expiration_date"] <= datetime.datetime.now():
            errors.append({"card_expiration_date": "Invalid expiration date."})

        if not attrs["card_holder_firstname"].isalpha():
            errors.append({"card_holder_firstname": "Invalid cardholder firstname."})

        if not attrs["card_holder_lastname"].isalpha():
            errors.append({"card_holder_lastname": "Invalid cardholder lastname."})

        if errors:
            raise ValidationError(errors)
        else:
            return attrs


class SubscriptionPlansSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = ["id", "name", "description", "price", "is_live", "is_monthly"]
    

class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = ["id", "user_id", "subscription_plan_id", "date_time"]
    
    def validate(self, attrs):
        errors = []
        if not User.object.filter(id=attrs["user_id"]).exists():
            errors.append({"user_id": "User does not exist."})

        if not SubscriptionPlans.object.filter(id=attrs["subscription_plan_id"]).exists():
            errors.append({"subscription_plan_id": "Subscription plan does not exist."})
        
        if errors:
            raise ValidationError(errors)
        else:
            return attrs

