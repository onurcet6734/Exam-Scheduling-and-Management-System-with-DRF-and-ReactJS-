from rest_framework import serializers
from halls.models import Hall

class HallsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.number_of_seats = validated_data.get('number_of_seats', instance.number_of_seats)
        instance.save()
        return instance