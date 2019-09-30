from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field


class CustomUserAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):

        user = super().save_user(request, user, form, False)
        user_field(user, 'first_name', request.data.get('firstName'))
        user_field(user, 'second_name', request.data.get('secondName'))
        user_field(user, 'age', request.data.get('age'))
        user.save()
        return user
