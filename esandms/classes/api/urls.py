from django.urls import path
from .views import ClassesListCreateView, ClassesUpdateDeleteDetailView

app_name = "classes"

urlpatterns = [
    path('list-create/', ClassesListCreateView.as_view(), name='list-create'),
    path('update-delete/<int:pk>/', ClassesUpdateDeleteDetailView.as_view(), name='update-delete'),
]