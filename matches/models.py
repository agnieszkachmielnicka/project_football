from django.db import models
from accounts.models import CustomUser

class Match(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    match_date = models.DateField()
    match_time = models.TimeField()
    quantity_of_players = models.IntegerField()
    location = models.CharField(max_length=500)
    if_private = models.BooleanField()
    players = models.ManyToManyField(CustomUser, related_name="players")

    def __str__(self):
        return self.name