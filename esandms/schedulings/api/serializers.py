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
        fields = "__all__"

class SchedulingSerializer(serializers.ModelSerializer):
    classid = serializers.PrimaryKeyRelatedField(queryset=Classes.objects.all(), write_only=True)
    class_info = ClassesSerializer(source='classid', read_only=True)

    hallid = serializers.PrimaryKeyRelatedField(queryset=Hall.objects.all(), write_only=True)
    hall_info = HallSerializer(source='hallid', read_only=True)

    examid = serializers.PrimaryKeyRelatedField(queryset=Exam.objects.all(), write_only=True)
    exam_info = ExamSerializer(source='examid', read_only=True)

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    user_info = UserSerializer(source='user', read_only=True)

    class Meta:
        model = Scheduling
        fields = ['id', 'created_on', 'updated_on', 'school_number', 'exam_start_date', 'exam_finish_date', 'duration', 'classid', 'class_info', 'hallid', 'hall_info', 'examid', 'exam_info', 'user', 'user_info']