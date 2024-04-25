from rest_framework import generics
from classes.models import Classes
from .serializers import ClassesSerializer
from rest_framework.permissions import IsAuthenticated

class ClassesListCreateView(generics.ListCreateAPIView):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer
    permission_classes = [IsAuthenticated]

class ClassesUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer
    permission_classes = [IsAuthenticated]