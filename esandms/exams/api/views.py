from rest_framework import generics
from exams.models import Exam
from .serializers import ExamsSerializer
from rest_framework.permissions import IsAuthenticated
from exams.api.permissions import IsSuperUserOrReadOnly

class ExamsListCreateView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamsSerializer
    permission_classes = [IsSuperUserOrReadOnly]

class ExamsUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamsSerializer
    permission_classes = [IsSuperUserOrReadOnly]

# Create your views here.
