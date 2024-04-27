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

    class Meta:
        model = Scheduling
        fields = '__all__'