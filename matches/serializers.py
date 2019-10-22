from rest_framework import serializers
from matches.models import Match
from accounts.models import CustomUser

class MatchSerializer(serializers.ModelSerializer):

    creator = serializers.SlugRelatedField(slug_field="username", queryset=CustomUser.objects.all())

    class Meta:
        model = Match
        fields = ("id", "name", "creator", "match_date", "match_time", "quantity_of_players", "location", 'if_private')