from rest_framework import serializers
from exams.models import Exam
from classes.models import Classes

class ClassNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = ['name']

class ExamsSerializer(serializers.ModelSerializer):
    classid = serializers.PrimaryKeyRelatedField(queryset=Classes.objects.all(), write_only=True)
    class_info = ClassNameSerializer(source='classid', read_only=True)

    class Meta:
        model = Exam
        fields = ['id', 'created_on', 'updated_on', 'name', 'classid', 'class_info']

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        classid_data = validated_data.pop('classid')
        classid = instance.classid

        classid.name = classid_data.get('name', classid.name)
        classid.save()

        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance