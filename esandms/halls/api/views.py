from rest_framework import generics
from halls.models import Hall
from .serializers import HallsSerializer
from rest_framework.permissions import IsAuthenticated
from halls.api.permissions import IsSuperUserOrReadOnly



class HallsListCreateView(generics.ListCreateAPIView):
    queryset = Hall.objects.all()
    serializer_class = HallsSerializer
    permission_classes = [IsSuperUserOrReadOnly]

class HallsUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hall.objects.all()
    serializer_class = HallsSerializer
    permission_classes = [IsSuperUserOrReadOnly]

