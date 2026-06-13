from django_filters import FilterSet, filters
from rest_framework import viewsets

from keadatabase.pagination import BirdPagination

from .models import BandCombo
from .serializers import BandComboSerializer


class BandComboFilter(FilterSet):
    colours = filters.BaseInFilter(lookup_expr='contains')
    symbols = filters.BaseInFilter(lookup_expr='contains')

    is_extended = filters.BooleanFilter(
        field_name='bird__bird_extended__is_extended',
        lookup_expr='isnull',
        exclude=True,
        label='Is extended',
    )
    is_featured = filters.BooleanFilter(
        field_name='bird__bird_extended__is_featured', label='Is featured'
    )

    class Meta:
        model = BandCombo
        fields = (
            'style',
            'study_area',
            'bird__status',
        )


class BandComboViewSet(viewsets.ModelViewSet):
    serializer_class = BandComboSerializer
    pagination_class = BirdPagination
    search_fields = (
        'name',
        'bird__name',
        'bird__primary_band',
    )
    ordering_fields = (
        'name',
        'style',
        'date_deployed',
        'date_imported',
        'study_area',
        'bird__name',
        'bird__status',
        'bird__bird_extended',
    )
    filterset_class = BandComboFilter

    def get_queryset(self):
        queryset = BandCombo.objects.select_related('bird', 'study_area').all()

        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset
