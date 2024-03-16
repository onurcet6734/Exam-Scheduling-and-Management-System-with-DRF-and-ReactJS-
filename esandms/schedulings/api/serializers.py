from rest_framework import serializers
from schedulings.models import Scheduling

class SchedulingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheduling
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.classid = validated_data.get('classid', instance.classid)
        instance.school_number = validated_data.get('school_number', instance.school_number),
        instance.exam_start_date = validated_data.get('exam_start_date', instance.exam_start_date),
        instance.exam_finish_date = validated_data.get('exam_finish_date', instance.exam_finish_date),
        instance.hallid = validated_data.get('hallid', instance.hallid),
        instance.examid = validated_data.get('examid', instance.examid),
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance

    