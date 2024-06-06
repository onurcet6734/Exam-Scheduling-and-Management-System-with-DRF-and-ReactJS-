

from django.urls import path
from .views import SchedulingListCreateView, SchedulingUpdateDeleteDetailView, ShowStudentSchedule

app_name = "schedulings"

urlpatterns = [
    path('list-create/', SchedulingListCreateView.as_view(),name='list-create'),
    path('update-delete/<int:pk>', SchedulingUpdateDeleteDetailView.as_view(), name='update-delete'),
    path('show-student-schedule/', ShowStudentSchedule.as_view(),name='show-student-schedule')
]