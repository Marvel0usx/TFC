import datetime

from django.shortcuts import get_object_or_404
from .models import CardInfo, Payment, SubscriptionPlans, Subscriptions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.utils import timezone

from rest_framework.pagination import LimitOffsetPagination

from .serializers import CardInfoSerializer, PaymentSerializer, SubscriptionPlansSerializer, SubscriptionSerializer

EMPTY_RESPONSE = Response({"data": {}}, status=404)


class Pagination(LimitOffsetPagination):
    default_limit = 10


class CardInfoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = CardInfo.objects.filter(user=request.user.id)
        if not instances.exists():
            return EMPTY_RESPONSE
        serializer = CardInfoSerializer(instances.first())

        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        # Disallow more than one card.
        if CardInfo.objects.filter(user=request.user.id).exists():
            return EMPTY_RESPONSE

        data = request.data.get("data")
        # Create an instance of cardinfo from above information
        serializer = CardInfoSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            cardinfo_saved = serializer.save(user=request.user)
        return Response({"success": "Card saved."})
    
    def put(self, request, *args, **kwargs):
        card_record = CardInfo.objects.filter(user=request.user.id)
        if not card_record.exists():
            return EMPTY_RESPONSE
        data = request.data.get("data")
        if data is None:
            return EMPTY_RESPONSE
        serializer = CardInfoSerializer(instance=card_record.first(), data=data, partial=False)
        if serializer.is_valid(raise_exception=True):
            card_record = serializer.save()
        return Response({"success": "Card updated successfully"})


class PaymentHistoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter out payments in the past.
        instances = Payment.objects.filter(user=request.user.id, date_time__lt=timezone.now()).all()
        if not instances.exists():
            return EMPTY_RESPONSE
        
        # Pagination
        paginator = Pagination()
        page = paginator.paginate_queryset(instances, request)
        serializer = PaymentSerializer(page, many=True)

        return Response({"data": serializer.data})


class PaymentFutureView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter out upcoming payment.
        instances = Payment.objects.filter(user=request.user.id, date_time__gt=timezone.now()).all()
        if not instances.exists():
            return EMPTY_RESPONSE
        serializer = PaymentSerializer(instances.first())

        return Response({"data": serializer.data})


class SubscriptionPlansView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        instances = SubscriptionPlans.objects.exclude(is_live=False).order_by("is_monthly")
        if not instances.exists():
            return EMPTY_RESPONSE

        # Pagination
        paginator = Pagination()
        page = paginator.paginate_queryset(instances, request)
        serializer = SubscriptionPlansSerializer(page, many=True)

        return Response({"data": serializer.data})


class SubscriptionsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instances = Subscriptions.objects.filter(user=request.user.id)
        if not instances.exists():
            return EMPTY_RESPONSE
        serializer = SubscriptionSerializer(instances.first())

        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        data = request.data.get("data")
        if data is None:
            return EMPTY_RESPONSE
        serializer = SubscriptionSerializer(data=data)
        if data.get("subscription_plan_id") is None:
            return EMPTY_RESPONSE
        if not data.get("subscription_plan_id").isnumeric():
            return EMPTY_RESPONSE
        subscription_plan = get_object_or_404(SubscriptionPlans.objects.all(), id=int(data.get("subscription_plan_id")))
        if not subscription_plan.is_live:
            return EMPTY_RESPONSE
        # If there is a plan for the user, do not repeat the subscription.
        if Subscriptions.objects.filter(user=request.user).exists():
            return EMPTY_RESPONSE
        # Save new subscription
        if serializer.is_valid(raise_exception=True):
            subscription = serializer.save(user=request.user, subscription_plan=subscription_plan)
        # Bill the card and start payment cycle.
        cardifo = CardInfo.objects.get(user=request.user.id)
        Payment.objects.create(
            user=request.user,
            subscription_plan=subscription_plan,
            amount=subscription_plan.price,
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=True
        )
        upcoming = Payment.objects.create(
            user=request.user,
            subscription_plan=subscription_plan,
            amount=subscription_plan.price,
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=False
        )
        # Next billing cycle
        Payment.objects.filter(id=upcoming.id).update(date_time=timezone.now() + datetime.timedelta(days=30))
        return Response({"success": f"Successfully subscribed to {subscription.subscription_plan.name}."})

    def put(self, request, *args, **kwargs):
        # Error checking: return 404 if error found.
        subscription = get_object_or_404(Subscriptions.objects.all(), user=request.user)
        payment = Payment.objects.filter(user=request.user.id, is_paid=False)
        if not payment.exists():
            return EMPTY_RESPONSE
        data = request.data.get("data")
        if data is None:
            return EMPTY_RESPONSE
        serializer = SubscriptionSerializer(instance=subscription, data=data, partial=True)
        # Validate subscription plan.
        if data.get("subscription_plan_id") is None:
            return EMPTY_RESPONSE
        if not data.get("subscription_plan_id").isnumeric():
            return EMPTY_RESPONSE
        subscription_plan = get_object_or_404(SubscriptionPlans.objects.all(), id=int(data.get("subscription_plan_id")))
        if not subscription_plan.is_live:
            return EMPTY_RESPONSE
        if serializer.is_valid(raise_exception=True):
            new_subscription = serializer.save()
        cardifo = get_object_or_404(CardInfo.objects.all(), user=request.user.id)

        # Update subscription
        subscription.delete()
        Subscriptions.objects.create(
            user=request.user,
            subscription_plan=subscription_plan
        )

        # Delete old, incoming payment
        payment.delete()
        # Start new bill cycle.
        Payment.objects.create(
            user=request.user,
            subscription_plan=subscription_plan,
            amount=subscription_plan.price,
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=True
        )
        upcoming = Payment.objects.create(
            user=request.user,
            subscription_plan=subscription_plan,
            amount=subscription_plan.price,
            card_number=cardifo.card_number,
            card_expiration_date=cardifo.card_expiration_date,
            card_holder_firstname=cardifo.card_holder_firstname,
            card_holder_lastname=cardifo.card_holder_lastname,
            is_paid=False
        )
        # Next billing cycle
        Payment.objects.filter(id=upcoming.id).update(date_time=upcoming.date_time + datetime.timedelta(days=30))

        return Response({"success": "Subscription plan updated successfully"})

    def delete(self, request, *args, **kwargs):
        subscription = get_object_or_404(Subscriptions.objects.all(), user=request.user)
        # Also delete the upcoming payment.
        payment = Payment.objects.filter(user=request.user,
                                         subscription_plan=SubscriptionPlans.objects.get(id=subscription.subscription_plan.id),
                                         is_paid=False)
        payment.delete()
        subscription.delete()
        return Response({"message": "Subscription cancelled."}, status=204)
