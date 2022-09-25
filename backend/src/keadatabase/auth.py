from rest_framework.authtoken import views
from rest_framework.throttling import ScopedRateThrottle


class ThrottledObtainAuthToken(views.ObtainAuthToken):
    """ Add throttling to token endpoint """
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'auth'
