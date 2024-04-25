from rest_framework import generics
from schedulings.models import Scheduling
from .serializers import SchedulingSerializer
from rest_framework.permissions import IsAuthenticated


class SchedulingListCreateView(generics.ListCreateAPIView):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [IsAuthenticated]


class SchedulingUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [IsAuthenticated]

