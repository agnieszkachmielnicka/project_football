from django.contrib import admin
from accounts.models import CustomUser, Position


class CustomUserAdmin(admin.ModelAdmin):
    search_fields = ['username']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Position)
