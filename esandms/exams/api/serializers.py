from rest_framework import serializers
from exams.models import Exam

class ExamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.classid = validated_data.get('classid', instance.classid)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    