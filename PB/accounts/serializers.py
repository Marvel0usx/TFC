from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import NON_FIELD_ERRORS, ValidationError
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from .models import UserAccount


# Serializer for creating user profile
# https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    avatar = serializers.ImageField()
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserAccount
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'avatar', 'phone_number')
        extra_kwargs = {'phone_number': {'required': True},
                        'first_name': {'required': True},
                        'last_name': {'required': True},
                        'avatar': {'required': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = UserAccount.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            avatar=validated_data['avatar'],
            phone_number=validated_data['phone_number'],
            credit_card=None,
            subscription_plan=None
        )

        user.set_password(validated_data['password'])
        user.save()
        return user


# Serializer for editing user profile
# https://medium.com/django-rest/django-rest-framework-change-password-and-update-profile-1db0c144c0a3
class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ["first_name", "last_name", "avatar", "phone_number"]


