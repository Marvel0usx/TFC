from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from .models import UserAccount, AdminAccount


# Serializer for creating user profile
# https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    avatar = serializers.ImageField()
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'avatar', 'phone_number')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            avatar=validated_data['avatar'],
            phone_number=validated_data['phone_number']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

# Serializer for editing user profile
# https://medium.com/django-rest/django-rest-framework-change-password-and-update-profile-1db0c144c0a3
class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["first_name", "last_name", "avatar", "phoneNumber"]

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.avatar = validated_data['avatar']
        instance.phoneNumber = validated_data['phoneNumber']
        instance.save()

        return instance


class AdminUpdateSerializer(ModelSerializer):
    class Meta:
        model = AdminAccount
        fields = ["first_name", "last_name", "email_address", "address", "phoneNumber"]
