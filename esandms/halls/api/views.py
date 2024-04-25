from rest_framework import generics
from halls.models import Hall
from .serializers import HallsSerializer
from rest_framework.permissions import IsAuthenticated

class HallsListCreateView(generics.ListCreateAPIView):
    queryset = Hall.objects.all()
    serializer_class = HallsSerializer
    permission_classes = [IsAuthenticated]

class HallsUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hall.objects.all()
    serializer_class = HallsSerializer
    permission_classes = [IsAuthenticated]

