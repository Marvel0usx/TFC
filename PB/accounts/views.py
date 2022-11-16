from .models import AdminAccount, UserAccount, account
from .forms import AdminAccountUpdateForm, UserAccountUpdateForm
from .serializers import AdminUpdateSerializer, UserUpdateSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics


class AdminAccountUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = account.objects.all()
    serializer_class = AdminUpdateSerializer


class UserAccountUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    queryset = account.objects.all()
    serializer_class = UserUpdateSerializer
