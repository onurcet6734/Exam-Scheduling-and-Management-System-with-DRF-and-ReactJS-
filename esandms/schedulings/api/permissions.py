from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import requests
from django.contrib.sites.shortcuts import get_current_site


class IsSuperUserOrReadOnly(permissions.BasePermission):

    message = "Öğrenciler bu alana erişim sağlayamaz"

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.is_superuser
        return False

    def has_object_permission(self, request, view, obj):
          return bool(request.user and request.user.is_authenticated)
    

class IsOwner(permissions.BasePermission):

    message = "Sadece öğrenciler erişim sağlayabilir"

    def has_permission(self, request, view):
        # import ipdb;ipdb.set_trace()
        user = User.objects.filter(username=request.user)
        if request.user.is_authenticated and user.get().is_staff==False and user.get().is_superuser==False:
            return True
        return False
    

    