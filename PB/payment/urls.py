from django.urls import path
from .views import *

app_name = "payment"

urlpatterns = [
    path("card/view/", CardInfoView.as_view()),
    path("card/add/", CardInfoView.as_view()),
    path("card/edit/", CardInfoView.as_view()),
    path("subscription/plans/all/", SubscriptionPlansView.as_view()),
    path("subscription/view/", SubscriptionsView.as_view()),
    path("subscription/subscribe/", SubscriptionsView.as_view()),
    path("subscription/edit/", SubscriptionsView.as_view()),
    path("subscription/cancel/", SubscriptionsView.as_view()),
    path("upcoming/", PaymentFutureView.as_view()),
    path("history/", PaymentHistoryView.as_view()),
]
