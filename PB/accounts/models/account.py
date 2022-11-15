from django.db import models


class Account(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    email_address = models.EmailField()
    address = models.TextField()
    phoneNumber = models.TextField()

    class Meta:
        abstract = True
