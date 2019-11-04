from rest_framework import serializers
from matches.models import Match
from accounts.models import CustomUser
from accounts.serializers import CustomUserSerializer

class MatchSerializer(serializers.ModelSerializer):

    creator = serializers.SlugRelatedField(slug_field="username", queryset=CustomUser.objects.all())
    players = serializers.SlugRelatedField(slug_field="username", queryset=CustomUser.objects.all(), many=True)

    class Meta:
        model = Match
        fields = ("id", "name", "creator", "match_date", "match_time", "quantity_of_players",
                  "location", 'if_private', "players")