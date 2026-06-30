from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.request import Request


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request: Request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)
