from rest_framework import viewsets
from accounts.models import CustomUser, Position
from accounts.serializers import CustomUserSerializer, PositionSerializer


class PositionsViewset(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class CustomUserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'username'







