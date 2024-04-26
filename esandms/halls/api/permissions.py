from rest_framework import permissions

class IsSuperUserOrReadOnly(permissions.BasePermission):

    message = "Öğrenciler bu alana erişim sağlayamaz"

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.is_superuser
        return False

    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS
