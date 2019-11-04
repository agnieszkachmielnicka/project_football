from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from matches.models import Match
from matches.serializers import MatchSerializer
from re import sub
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework import generics

# class MatchViewset(viewsets.ModelViewSet):
#     queryset = Match.objects.all()
#     serializer_class = MatchSerializer

class MatchViewset(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        header_token = self.request.META.get('HTTP_AUTHORIZATION', None)
        print(header_token)
        if header_token is not None:
            try:
                token = sub('Token ', '', self.request.META.get('HTTP_AUTHORIZATION', None))
                token_obj = Token.objects.get(key=token)
                self.request.user = token_obj.user
            except Token.DoesNotExist:
                pass
        # This is now the correct user
        print(self.request.user)
        return Match.objects.filter(creator=self.request.user)

    def get(self, request, pk):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response({"matches": serializer.data})


class PublicMatchList(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    serializer_class = MatchSerializer

    def get_queryset(self):
        return Match.objects.filter(if_private=False)

