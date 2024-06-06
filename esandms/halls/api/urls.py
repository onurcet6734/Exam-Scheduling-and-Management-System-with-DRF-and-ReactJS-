from django.urls import path
from .views import HallsListCreateView, HallsUpdateDeleteDetailView

app_name = "halls"

urlpatterns = [
    path('list-create/', HallsListCreateView.as_view(), name='list-create'),
    path('update-delete/<int:pk>/', HallsUpdateDeleteDetailView.as_view(), name='update-delete'),
]