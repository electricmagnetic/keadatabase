from rest_framework import viewsets
#from rest_framework_gis.filters import InBBoxFilter
from rest_framework_gis.filterset import GeoFilterSet
from rest_framework_gis.filters import GeometryFilter
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet

from keadatabase.pagination import ObservationPagination
from ..models.observations import Sighting
from ..serializers.observations import ObservationSerializer

class ObservationFilter(GeoFilterSet):
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
    #filter_backends = (InBBoxFilter, DjangoFilterBackend)
    #bbox_filter_field = 'point_location'
    #bbox_filter_include_overlapping = True # Optional
    ordering_fields = (
        'contributor',
        'region',
        'date_sighted',
        'time_sighted',
        'date_created',
        'date_updated',
    )
