from django.urls import path
from .views import ExamsListCreateView, ExamsUpdateDeleteDetailView

app_name = "exams"

urlpatterns = [
    path('list-create/', ExamsListCreateView.as_view(), name='list-create'),
    path('update-delete/<int:pk>/', ExamsUpdateDeleteDetailView.as_view(), name='update-delete'),
]