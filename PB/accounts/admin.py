from django.contrib import admin
from .models.account import Account
from .models.AdminAccount import AdminAccount
from .models.UserAccount import UserAccount

# Register your models here.
admin.site.register(Account)
admin.site.register(UserAccount)
