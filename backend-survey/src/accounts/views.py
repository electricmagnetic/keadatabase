from rest_framework import generics, permissions

from .serializers import UserProfileSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    GET        /account/profile/ – return the authenticated user's profile.
    PATCH/PUT  /account/profile/ – update first_name and/or last_name.
    """

    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'patch', 'put', 'head', 'options']

    def get_object(self):
        return self.request.user
