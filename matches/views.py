from matches.models import Match
from matches.serializers import MatchSerializer
from rest_framework import viewsets

class MatchViewset(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
