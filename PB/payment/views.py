import datetime

from django.shortcuts import get_object_or_404
from .models import CardInfo, Payment, SubscriptionPlans, Subscriptions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CardInfoSerializer, PaymentSerializer, SubscriptionPlansSerializer, SubscriptionSerializer


class CardInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = CardInfo.objects.filter(user=request.user)
        serializer = CardInfoSerializer(instances)

        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        data = request.data.get("data")
        # Create an instance of cardinfo from above information
        serializer = CardInfoSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            cardinfo_saved = serializer.save()
        return Response({"success": "Card saved."})
    
    def put(self, request, *args, **kwargs):
        card_record = get_object_or_404(CardInfo.objects.all(), user=request.user)
        data = request.data.get("data")
        serializer = CardInfoSerializer(instance=card_record, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            card_record = serializer.save()
        return Response({"success": "Card updated successfully"})


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


class SubscriptionPlansView(APIView):
    def get(self, request):
        instances = SubscriptionPlans.objects.exclude(is_live=False).order_by("is_monthly")
        serializer = SubscriptionPlansSerializer(instances, many=True)

        return Response({"data": serializer.data})


class SubscriptionsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = Subscriptions.objects.filter(user=request.user)
        serializer = SubscriptionSerializer(instances)

        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        data = request.data.get("data")
        serializer = SubscriptionSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            subscription = serializer.save()

        # Bill the card and start payment cycle.
        subscription_plan = SubscriptionPlans.objects.get(id=subscription.subscription_plan)
        cardifo = CardInfo.objects.get(user=request.user)
        Payment.objects.create(
            user=request.user,
            subscription=subscription_plan,
            amount=subscription_plan.price,
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=True
        )
        Payment.objects.create(
            user=request.user,
            subscription=subscription_plan,
            amount=subscription_plan.price,
            # Next billing cycle
            date_time=datetime.date.today() + datetime.timedelta(days=30),
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=False
        )

        return Response({"success": f"Successfully subscribed to {subscription.name} plan."})

    def put(self, request, *args, **kwargs):
        subscription = get_object_or_404(Subscriptions.objects.all(), user=request.user)
        payment = Payment.objects.get(user=request.user, is_paid=False)
        data = request.data.get("data")
        serializer = SubscriptionSerializer(instance=subscription, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            new_subscription = serializer.save()
        # Start new bill cycle.
        payment.delete()
        subscription_plan = SubscriptionPlans.objects.get(id=new_subscription.subscription_plan)
        cardifo = CardInfo.objects.get(user=request.user)
        Payment.objects.create(
            user=request.user,
            subscription=subscription_plan,
            amount=subscription_plan.price,
            # Next billing cycle
            date_time=datetime.date.today() + datetime.timedelta(days=30),
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=False
        )

        return Response({"success": "Subscription plan updated successfully"})

    def delete(self, request, *args, **kwargs):
        subscription = get_object_or_404(Subscriptions.objects.all(), user=request.user)
        # Also delete the upcoming payment.
        payment = Payment.objects.filter(user=request.user,
                                         subscription=SubscriptionPlans.objects.get(id=subscription.subscription_plan),
                                         is_paid=False)
        payment.delete()
        subscription.delete()
        return Response({"message": "Subscription cancelled."}, status=204)
