from django.db.models import Count, Q
from django_filters import FilterSet, filters
from rest_framework import viewsets

from keasurvey.pagination import GridTilePagination

from .models import GridTile
from .serializers import BaseGridTileSerializer


class GridTileFilter(FilterSet):
    has_hours = filters.BooleanFilter(
        field_name='hours', lookup_expr='isnull', exclude=True, label='Has hours'
    )

    class Meta:
        model = GridTile
        fields = ('has_hours',)


class GridTileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BaseGridTileSerializer
    filterset_class = GridTileFilter
    pagination_class = GridTilePagination

    def get_queryset(self):
        queryset = GridTile.objects.all()
        queryset = queryset.annotate(
            hours_total=Count('hours'),
            hours_with_kea=Count('id', filter=Q(hours__kea=True)),
        )

        return queryset
