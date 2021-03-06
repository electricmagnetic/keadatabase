from rest_framework import serializers
from rest_framework_gis.serializers import GeometryField

from ..models.birds import BirdSighting
from .observations import ObservationSerializer
from birds.serializers import BirdSerializer


class BirdObservationSerializer(serializers.ModelSerializer):
    get_banded_display = serializers.CharField()
    get_sex_guess_display = serializers.CharField()
    get_life_stage_guess_display = serializers.CharField()

    bird = BirdSerializer(many=False, read_only=True)
    sighting = ObservationSerializer(many=False, read_only=True)

    # TODO: remove this field. Currently left in for GeoJSON reasons.
    sighting__point_location = GeometryField(source='sighting.point_location')

    class Meta:
        model = BirdSighting
        fields = '__all__'

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related(
            "bird",
            "bird__band_combo",
            "bird__study_area",
            "bird__bird_extended",
            "sighting",
            "sighting__contributor",
        )

        return queryset
