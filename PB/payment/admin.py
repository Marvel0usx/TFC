from django.contrib import admin
from .models import SubscriptionPlans, Subscriptions, Payment, CardInfo

# Register your models here.
admin.site.register(SubscriptionPlans)
admin.site.register(Subscriptions)
admin.site.register(Payment)
admin.site.register(CardInfo)
