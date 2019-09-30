from django.db import models
from django.contrib.auth.models import AbstractUser


class Position(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):

    GENDER_CHOICES = (
        ("F", "FAMALE"),
        ("M", "MALE")
    )

    username = models.CharField(blank=False, max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=False, default="superuser")
    second_name = models.CharField(max_length=255, blank=False, default="superuser")
    email = models.EmailField(blank=False, unique=True)
    age = models.IntegerField(blank=False, default=18)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    country = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(blank=True, null=True, max_length=255)
    positions = models.ManyToManyField(Position, related_name='positions')
    favourite_team = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username
