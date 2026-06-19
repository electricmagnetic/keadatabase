from rest_framework import renderers

from keadatabase.pagination import (
    BirdObservationGeoJSONPagination,
    ObservationGeoJSONPagination,
)
from sightings.views.birds import BirdObservationViewSet
from sightings.views.observations import ObservationViewSet

from .serializers import (
    BirdObservationGeoJSONSerializer,
    ObservationGeoJSONSerializer,
)


class ObservationGeoJSONViewSet(ObservationViewSet):
    serializer_class = ObservationGeoJSONSerializer
    pagination_class = ObservationGeoJSONPagination

    # Disable HTML view of this for compatibility
    renderer_classes = [renderers.JSONRenderer]


class BirdObservationGeoJSONViewSet(BirdObservationViewSet):
    serializer_class = BirdObservationGeoJSONSerializer
    pagination_class = BirdObservationGeoJSONPagination

    # Disable HTML view of this for compatibility
    renderer_classes = [renderers.JSONRenderer]
