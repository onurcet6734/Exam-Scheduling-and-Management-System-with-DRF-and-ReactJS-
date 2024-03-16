from rest_framework import generics
from exams.models import Exam
from .serializers import ExamsSerializer
#f  rom rest_framework import IsAuthenticated

class ExamsListCreateView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamsSerializer
    #permission_classes = [IsAuthenticated]

class ExamsUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamsSerializer
    #permission_classes = [IsAuthenticated]

# Create your views here.
