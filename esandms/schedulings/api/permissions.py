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
        return request.method in permissions.SAFE_METHODS
    

class IsOwner(permissions.BasePermission):

    def has_permission(self, request, viewn):
        return request.user.is_authenticated
    