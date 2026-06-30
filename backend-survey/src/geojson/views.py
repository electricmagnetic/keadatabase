from rest_framework import renderers

from keasurvey.pagination import (
    GridTileGeoJSONPagination,
)
from locations.views import GridTileViewSet

from .serializers import (
    GridTileGeoJSONSerializer,
)


class GridTileGeoJSONViewSet(GridTileViewSet):
    serializer_class = GridTileGeoJSONSerializer
    pagination_class = GridTileGeoJSONPagination

    # Disable HTML view of this for compatibility
    renderer_classes = [renderers.JSONRenderer]
