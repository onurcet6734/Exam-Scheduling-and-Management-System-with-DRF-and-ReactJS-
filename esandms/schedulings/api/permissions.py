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
        import ipdb;ipdb.set_trace()
        payload = {
            "username" : "berkakalin",
            "password": "1234Qwer_"
        }
        current_site = get_current_site(request)
        domain_name = current_site.domain
        url = "http://" + domain_name + "/api/token/"
        response= requests.post(url =url,data=payload)
        response.json()
        user = User.objects.get(username=payload['username'])
        
        if user:
            token = Token.objects.create(user=user)
            if token:
                token.key = response.json()['access']
                token.save()
                return True
            else:
                return False
        else:
            return False
