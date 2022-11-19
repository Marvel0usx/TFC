from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
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
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    avatar = serializers.ImageField(required=True)
    phone_number = serializers.IntegerField(required=True)

    def validate(self, attrs):
        if attrs['first_name'] is None:
            raise serializers.ValidationError({"first_name": "Empty first_name field"})

        if attrs['last_name'] is None:
            raise serializers.ValidationError({"last_name": "Empty first_name field"})

        if attrs['avatar'] is None:
            raise serializers.ValidationError({"avatar": "Empty first_name field"})

        if attrs['phone_number'] is None:
            raise serializers.ValidationError({"phone_number": "Empty first_name field"})

        return attrs

    class Meta:
        model = UserAccount
        fields = ["first_name", "last_name", "avatar", "phone_number"]

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.avatar = validated_data['avatar']
        instance.phone_number = validated_data['phone_number']
        instance.save()

        return instance
