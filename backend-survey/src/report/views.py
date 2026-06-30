from rest_framework import mixins, permissions, viewsets

from .serializers import (
    ReportSurveySerializer,
)


class ReportSurveyViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ReportSurveySerializer
    throttle_scope = 'report'
    permission_classes = [permissions.AllowAny]
