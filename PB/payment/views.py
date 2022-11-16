import datetime

from django.shortcuts import render
from django.views.generic import FormView
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic import FormView, DetailView, ListView
from rest_framework.generics import UpdateAPIView, CreateAPIView, RetrieveAPIView, ListAPIView

from .models import CardInfo, Payment, SubscriptionPlans, Subscriptions
from .forms import CardInfoUpdateForm
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from .serializers import CardInfoSerializer, PaymentSerializer, SubscriptionPlansSerializer, SubscriptionSerializer


class CardInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = CardInfo.objects.filter(user=request.user)
        serializer = CardInfoSerializer(instances)

        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        data = request.data.get("cardinfo")
        # Create an instance of cardinfo from above information
        serializer = CardInfoSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            cardinfo_saved = serializer.save()
        return HttpResponse(status=200)
    
    def put

class PaymentHistoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter out payments in the past.
        instances = Payment.objects.filter(user=request.user, date_time__lt=datetime.datetime.now()).all()
        serializer = PaymentSerializer(instances, many=True)

        return Response({"data": serializer.data})


class PaymentFutureView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter out upcoming payment.
        instances = Payment.objects.filter(user=request.user, date_time__gt=datetime.datetime.now()).all()
        serializer = PaymentSerializer(instances, many=True)

        return Response({"data": serializer.data})


class SubscriptionPlansGet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = SubscriptionPlans.objects.exclude(is_live=False).order_by("is_monthly")
        serializer = SubscriptionPlansSerializer(instances, many=True)

        return Response({"data": serializer.data})


class SubscriptionHistoryGet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = Subscriptions.objects.filter(user=request.user)
        serializer = SubscriptionSerializer(instances)

        return Response({"data": serializer.data})