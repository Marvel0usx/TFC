from django.shortcuts import render
from django.views.generic import FormView
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic import FormView, DetailView, ListView
from .models import CardInfo, Payment
from .forms import CardInfoUpdateForm
from django.template.response import TemplateResponse


class CardInfoUpdate(FormView):
    # (TODO:haoyan)
    pass


def delete_card_info(request):
    # (TODO:haoyan)
    pass


def get_card_info(request):
    # (TODO:haoyan)
    pass


class PaymentHistoryView(DetailView):
    # (TODO:haoyan)
    pass


class PaymentFutureView(ListView):
    # (TODO:haoyan)
    pass


def get_subscription(request):
    # (TODO:haoyan)
    pass


class SubscriptionUpdate(FormView):
    # (TODO:haoyan)
    pass
