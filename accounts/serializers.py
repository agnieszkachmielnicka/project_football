from rest_framework import serializers
from accounts.models import CustomUser, Position


class PositionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Position
        fields = ('id', 'name')


class CustomUserSerializer(serializers.ModelSerializer):

    positions = PositionSerializer(many=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'second_name', 'age', 'gender', 'country', 'city',
                  'positions', 'favourite_team')
        read_only_fields = ('id', 'username', 'email')

    def create(self, validated_data):
        positions_data = validated_data.pop('positions')
        user = CustomUser.objects.create(**validated_data)
        for position in positions_data:
            Position.objects.create(user=user, **position)
        return user

    def update(self, instance, validated_data):
        positions_data = validated_data.pop('positions')
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.second_name = validated_data.get('second_name', instance.second_name)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.country = validated_data.get('country', instance.country)
        instance.city = validated_data.get('city', instance.city)
        instance.favourite_team = validated_data.get('favourite_team', instance.favourite_team)
        instance.positions.clear()
        instance.save()

        for position_data in positions_data:
            position = Position.objects.get(name=position_data.get('name'))
            instance.positions.add(position)
        return instance
