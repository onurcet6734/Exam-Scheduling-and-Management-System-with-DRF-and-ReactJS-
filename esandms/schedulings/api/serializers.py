from rest_framework import serializers
from schedulings.models import Scheduling

class SchedulingSerializer(serializers.ModelSerializer):
    
    #get class name into classid
    classid = serializers.StringRelatedField()

    class Meta:
        model = Scheduling
        fields =  '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['className'] = instance.classid.name  
        representation['HallName'] = instance.hallid.name  
        representation['ExamName'] = instance.examid.name  
        representation['UserName'] = instance.user.username
        representation.pop('classid')
        representation.pop('hallid')
        representation.pop('examid')
        representation.pop('user')

        return representation

    