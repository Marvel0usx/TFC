from django.contrib import admin
from .models.AdminAccount import AdminAccount
from .models.UserAccount import UserAccount

# Register your models here.
admin.site.register(AdminAccount)
admin.site.register(UserAccount)
