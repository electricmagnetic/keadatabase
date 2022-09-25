from rest_framework import viewsets, permissions
from rest_framework import mixins

from .serializers import ReportObservationSerializer
from .serializers import ReportSurveySerializer
from .serializers import ImportObservationSerializer


class ReportObservationBaseViewSet(
    mixins.CreateModelMixin, viewsets.GenericViewSet
):
    throttle_scope = 'report'
    permission_classes = [permissions.AllowAny]


class ReportObservationViewSet(ReportObservationBaseViewSet):
    serializer_class = ReportObservationSerializer


class ReportSurveyViewSet(ReportObservationBaseViewSet):
    serializer_class = ReportSurveySerializer


class ImportObservationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ImportObservationSerializer
    permission_classes = [permissions.IsAuthenticated]