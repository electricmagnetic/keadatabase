from rest_framework import viewsets
from rest_framework_gis.filters import GeometryFilter
from django_filters import FilterSet

from keadatabase.pagination import ObservationPagination
from ..models.observations import Sighting
from ..serializers.observations import ObservationSerializer


class ObservationFilter(FilterSet):
    point_location = GeometryFilter(lookup_expr='within')

    class Meta:
        model = Sighting
        fields = (
            'sighting_type',
            'precision',
            'number',
            'status',
            'confirmed',
        )


class ObservationViewSet(viewsets.ModelViewSet):
    queryset = Sighting.objects. \
               select_related('contributor',). \
               exclude(status='private').exclude(status='bad')
    serializer_class = ObservationSerializer
    pagination_class = ObservationPagination
    filterset_class = ObservationFilter
    ordering_fields = (
        'contributor',
        'region',
        'date_sighted',
        'time_sighted',
        'date_created',
        'date_updated',
    )
