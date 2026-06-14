from rest_framework import permissions, viewsets

from keadatabase.pagination import SurveyPagination

from .models.observers import Observer
from .models.surveys import Survey, SurveyHour
from .serializers import ObserverSerializer, SurveyHourSerializer, SurveySerializer


class SurveyHourViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SurveyHourSerializer
    pagination_class = SurveyPagination
    ordering_fields = (
        'id',
        'survey__date',
    )
    filterset_fields = (
        'grid_tile',
        'activity',
        'kea',
        'survey',
    )

    def get_queryset(self):
        queryset = SurveyHour.objects.select_related('survey', 'grid_tile').all()

        return queryset


class SurveyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SurveySerializer
    pagination_class = SurveyPagination
    ordering_fields = (
        'id',
        'date',
    )
    filterset_fields = ('status',)

    def get_queryset(self):
        queryset = (
            Survey.objects.prefetch_related('hours').select_related('observer').all()
        )

        return queryset


class ObserverViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ObserverSerializer
    pagination_class = SurveyPagination
    ordering_fields = ('name',)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Observer.objects.select_related('survey').all()

        return queryset
