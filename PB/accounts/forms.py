from django import forms
from PB.studios.models.fitnessClass import FitnessClass
from PB.payment.models import CardInfo
from PB.payment.models import Subscriptions

try:
    from PB.PB.settings import MAX_LENGTH
except ImportError:
    MAX_LENGTH = 250


class AdminAccountUpdateForm(forms.Form):
    first_name = forms.CharField(max_length=MAX_LENGTH, required=True)
    last_name = forms.CharField(max_length=MAX_LENGTH, required=True)
    email_address = forms.EmailField(max_length=MAX_LENGTH, required=True)
    address = forms.CharField(max_length=MAX_LENGTH, required=True)
    phoneNumber = forms.CharField(max_length=MAX_LENGTH, required=True)

    __attributes__ = ("first_name", "last_name", "email_address", "address", "phoneNumber")

    def clean(self):
        data = super().clean()

        error = False
        for field in AdminAccountUpdateForm.__attributes__:
            if data.get(field) == "":
                self.add_error(field, "This field is required")
                error = True

        if error:
            return data

        # TODO: validate content


class UserAccountUpdateForm(forms.Form):
    first_name = forms.CharField(max_length=MAX_LENGTH, required=True)
    last_name = forms.CharField(max_length=MAX_LENGTH, required=True)
    email_address = forms.EmailField(max_length=MAX_LENGTH, required=True)
    address = forms.CharField(max_length=MAX_LENGTH, required=True)
    phoneNumber = forms.CharField(max_length=MAX_LENGTH, required=True)

    # TODO: Foreignkey fields

    __attributes__ = ("first_name", "last_name", "email_address", "address", "phoneNumber")

    def clean(self):
        data = super().clean()

        error = False
        for field in AdminAccountUpdateForm.__attributes__:
            if data.get(field) == "":
                self.add_error(field, "This field is required")
                error = True

        if error:
            return data

        # TODO: validate content
