from rest_framework.serializers import ModelSerializer
from .models import UserAccount, AdminAccount


# TODO: Validation & update

class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["first_name", "last_name", "email_address", "address", "phoneNumber",
                  "credit_card", "fitness_class", "subscription_plan"]


class AdminUpdateSerializer(ModelSerializer):
    class Meta:
        model = AdminAccount
        fields = ["first_name", "last_name", "email_address", "address", "phoneNumber"]
