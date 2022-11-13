from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
import datetime


try:
    from PB.PB.settings import MAX_LENGTH
except ImportError:
    MAX_LENGTH = 250


error_msg = {
    "card_expiration_date": "Your card is expired.",
    "card_number": "Invalid card number.",
    "card_holder_name": "Illegal characters appear in cardholder name."
}


class PaymentForm(forms.Form):
    pass


class CardInfoUpdateForm(forms.Form):
    """
    Updates card info of the current user. Validates user input at checkout.
    """
    card_number = forms.CharField(max_length=20, min_length=12, required=True)
    card_expiration_date = forms.DateField(required=True, widget=forms.DateInput())
    card_holder_firstname = forms.CharField(max_length=MAX_LENGTH, required=True)
    card_holder_lastname = forms.CharField(max_length=MAX_LENGTH, required=True)

    __attributes__ = ("card_number", "card_expiration_date", "card_holder_firstname", "card_holder_lastname")

    def clean(self):
        data = super().clean()

        error = False
        for field in CardInfoUpdateForm.__attributes__:
            if data.get(field) == "":
                self.add_error(field, "This field is required")
                error = True

        if error:
            return data

        # validate content
        exp_date = data.get("card_expiration_date")
        exp_date = datetime.date(int(exp_date[:4]), int(exp_date[5:7]), int(exp_date[8:10]))
        if exp_date < datetime.date.today():
            self.add_error("card_expiration_date", error_msg["card_expiration_date"])

        card_number = data.get("card_number")
        if not card_number.isnumeric():
            self.add_error("card_number", error_msg["card_number"])

        name = data.get("card_holder_lastname").strip() + data.get("card_holder_firstname").strip()
        if not name.isalpha():
            self.add_error("card_holder_lastname", error_msg["card_holder_name"])

        return data