from rest_framework import generics
from schedulings.api.permissions import IsSuperUserOrReadOnly, IsOwner
from schedulings.models import Scheduling
from .serializers import SchedulingSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token, TokenProxy
from rest_framework import viewsets
from django.contrib.auth.hashers import make_password
from schedulings.api.services import CheckCourseOverlappingService




class SchedulingListCreateView(generics.ListCreateAPIView):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [IsSuperUserOrReadOnly]
    service = CheckCourseOverlappingService()
    

    def post(self, request, *args, **kwargs):
        if User.objects.get(id=request.data["user"]).is_superuser:
            return Response({"hata": "Yöneticilerin sınav programı olusamaz."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not self.service.check_schedules(serializer):
                return Response({"hata": "Öğrencinin dersleri çakışıyor."}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save(user=serializer.validated_data.get('user', None))
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class SchedulingUpdateDeleteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scheduling.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [IsSuperUserOrReadOnly]
    service = CheckCourseOverlappingService()

    def update(self, request, *args, **kwargs):
        if User.objects.get(id=request.data["user"]).is_superuser:
            return Response({"hata": "Yöneticilerin sınav programı olusamaz."}, status=status.HTTP_400_BAD_REQUEST)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            if not self.service.check_schedules(serializer) and Scheduling.objects.filter(user=serializer.validated_data.get('user', None)).count() > 1:
                return Response({"hata": "Öğrencinin dersleri çakışıyor."}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)


class ShowStudentSchedule(generics.ListAPIView):
    serializer_class = SchedulingSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Scheduling.objects.filter(user=self.request.user)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        is_superuser = self.request.query_params.get('is_superuser', None)

        if username is not None:
            queryset = queryset.filter(username=username)

        if is_superuser is not None:
            if is_superuser.lower() == 'true':
                queryset = queryset.filter(is_superuser=True)
            elif is_superuser.lower() == 'false':
                queryset = queryset.filter(is_superuser=False)

        return queryset