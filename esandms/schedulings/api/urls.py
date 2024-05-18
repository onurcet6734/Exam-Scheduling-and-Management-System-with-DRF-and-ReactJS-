

from django.urls import path
from .views import SchedulingListCreateView, SchedulingUpdateDeleteDetailView, ShowStudentSchedule

app_name = "schedulings"

urlpatterns = [
    path('list-create/', SchedulingListCreateView.as_view()),
    path('update-delete/<int:pk>', SchedulingUpdateDeleteDetailView.as_view()),
    path('show-student-schedule/', ShowStudentSchedule.as_view())
]