from rest_framework import mixins, permissions, viewsets

from .serializers import (
    ImportObservationSerializer,
    ReportObservationSerializer,
    ReportSurveySerializer,
)


class ReportObservationBaseViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    throttle_scope = 'report'
    permission_classes = [permissions.AllowAny]


class ReportObservationViewSet(ReportObservationBaseViewSet):
    serializer_class = ReportObservationSerializer


class ReportSurveyViewSet(ReportObservationBaseViewSet):
    serializer_class = ReportSurveySerializer


class ImportObservationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Auth-required (admin) view for data import (without throttling)"""

    serializer_class = ImportObservationSerializer
    permission_classes = [permissions.IsAdminUser]
