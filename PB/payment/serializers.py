from rest_framework.serializers import ModelSerializer, ValidationError
from .models import *
from django.utils import timezone
import datetime
import re


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "user_id", "subscription_plan_id", "amount", "date_time",
        "card_number", "card_expiration_date", "card_holder_firstname",
        "card_holder_lastname", "is_paid"]

    def validate(self, attrs):
        errors = []
        if attrs["amount"] < 0:
            errors.append({"amount": "Amount must be a non-negative number."})
        subscription_plan_id = int(attrs["subscription_plan_id"])
        if SubscriptionPlans.objects.get(id=subscription_plan_id) is None:
            errors.append({"subscription_plan_id": "Invalid subscription plan."})
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

        pattern = re.compile("""^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$""")

        if (not attrs["card_number"].isnumeric()) or (len(attrs["card_number"]) > 18) or (re.match(pattern, attrs["card_number"]) is None):
            errors.append({"card_number": "Invalid card number."})

        if attrs["card_expiration_date"] <= datetime.date.today():
            errors.append({"card_expiration_date": "Invalid expiration date."})

        if not attrs["card_holder_firstname"].isalpha():
            errors.append({"card_holder_firstname": "Invalid cardholder firstname."})

        if not attrs["card_holder_lastname"].isalpha():
            errors.append({"card_holder_lastname": "Invalid cardholder lastname."})

        if errors:
            raise ValidationError(errors)
        else:
            return attrs


    def update(self, instance, validated_data):
        instance.card_number = validated_data.get("card_number", instance.card_number)
        instance.card_expiration_date = validated_data.get("card_expiration_date", instance.card_expiration_date)
        instance.card_holder_firstname = validated_data.get("card_holder_firstname", instance.card_holder_firstname)
        instance.card_holder_lastname = validated_data.get('card_holder_lastname', instance.card_holder_lastname)

        instance.save()
        return instance


class SubscriptionPlansSerializer(ModelSerializer):
    class Meta:
        model = SubscriptionPlans
        fields = ["id", "name", "description", "price", "is_live", "is_monthly"]


class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = ["id", "user_id", "subscription_plan_id", "date_time"]
    
    def update(self, instance, validated_data):
        instance.subscription_plan_id = validated_data.get("subscription_plan_id", instance.subscription_plan_id)
        instance.date_time = timezone.now()

        instance.save()
        return instance
