from rest_framework import serializers
from classes.models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.year = validated_data.get('year', instance.year)
        instance.semester = validated_data.get('semester', instance.semester)
        instance.count_of_students = validated_data.get('count_of_students', instance.count_of_students)
        instance.save()
        return instance
    