from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from PB.studios.models.fitnessClass import FitnessClass
from PB.payment.models import CardInfo
from PB.payment.models import Subscriptions

try:
    from PB.PB.settings import MAX_LENGTH
except ImportError:
    MAX_LENGTH = 250


class SignupForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()
    password2 = forms.CharField()
    email = forms.EmailField(widget=forms.EmailInput(), required=False,
                             error_messages={'invalid': "Enter a valid email address"})
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    phoneNumber = forms.IntegerField(required=False)

    def clean(self):
        data = super().clean()

        if len(data.get('username')) < 4:
            self.add_error('username', 'Username must be at least 4 characters')
        if data.get('password') != data.get('password2'):
            self.add_error('password2', 'Passwords do not match')
        if User.objects.filter(username=data.get('username')).exists():
            self.add_error('username', 'Username already exists')

        return data




