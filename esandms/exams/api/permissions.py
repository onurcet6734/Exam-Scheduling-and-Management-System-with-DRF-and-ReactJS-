from rest_framework import permissions

class IsSuperUserOrReadOnly(permissions.BasePermission):

    message = "Öğrenciler bu alana erişim sağlayamaz"

    def has_permission(self, request, view):
        user = request.user.is_superuser
        if user:
            return request.user.is_superuser
        return False

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated)
