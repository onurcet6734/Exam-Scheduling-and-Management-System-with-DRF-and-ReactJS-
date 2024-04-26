from rest_framework import serializers
from schedulings.models import Scheduling
from classes.models import Classes
from halls.models import Hall
from exams.models import Exam
from django.contrib.auth.models import User

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        

class SchedulingSerializer(serializers.ModelSerializer):
    classid_detail = ClassesSerializer(source='classid', read_only=True)
    hallid_detail = HallSerializer(source='hallid', read_only=True)
    examid_detail = ExamSerializer(source='examid', read_only=True)
    user_detail = UserSerializer(source='user', read_only=True)

    classid = serializers.PrimaryKeyRelatedField(
        queryset=Classes.objects.all(),
        many=False,
        allow_null=True,
        required=False
    )
    hallid = serializers.PrimaryKeyRelatedField(
        queryset=Hall.objects.all(),
        many=False,
        allow_null=True,
        required=False
    )
    examid = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all(),
        many=False,
        allow_null=True,
        required=False
    )
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='username',
        many=False,
        allow_null=True,
        required=False
    )

    class Meta:
        model = Scheduling
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance