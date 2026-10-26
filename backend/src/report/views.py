import logging

from rest_framework import mixins, permissions, viewsets

from keadatabase import apps as keadatabase_apps

from .serializers import (
    ImportObservationSerializer,
    ReportObservationSerializer,
)


posthog_log = logging.getLogger('posthog.export')


class ReportObservationBaseViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    throttle_scope = 'report'
    permission_classes = [permissions.AllowAny]


class ReportObservationViewSet(ReportObservationBaseViewSet):
    serializer_class = ReportObservationSerializer

    def perform_create(self, serializer):
        sighting = serializer.save()
        properties = {
            'sighting_type': sighting.sighting_type,
            'reported_bird_count': sighting.number,
            'bird_record_count': sighting.birds.count(),
            'precision_meters': sighting.precision,
        }
        if keadatabase_apps.posthog_client is not None:
            keadatabase_apps.posthog_client.capture(
                'observation_reported',
                properties=properties,
            )
        posthog_log.info(
            'observation report processed',
            extra={'event': 'observation_reported', **properties},
        )


class ImportObservationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Auth-required (admin) view for data import (without throttling)"""

    serializer_class = ImportObservationSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        sighting = serializer.save()
        properties = {
            'sighting_type': sighting.sighting_type,
            'reported_bird_count': sighting.number,
            'bird_record_count': sighting.birds.count(),
            'precision_meters': sighting.precision,
        }
        if keadatabase_apps.posthog_client is not None:
            keadatabase_apps.posthog_client.capture(
                'observation_imported',
                properties=properties,
            )
        posthog_log.info(
            'observation import processed',
            extra={'event': 'observation_imported', **properties},
        )
