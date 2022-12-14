from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserAccount

from .serializers import UserUpdateSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics


class RegisterView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class UserAccountUpdateView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


# logout the user and abandon the token
# https://medium.com/django-rest/logout-django-rest-framework-eb1b53ac6d35
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

