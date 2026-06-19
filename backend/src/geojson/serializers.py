from rest_framework_gis.serializers import GeoFeatureModelSerializer

from sightings.serializers.birds import BirdObservationSerializer
from sightings.serializers.observations import ObservationSerializer


class ObservationGeoJSONSerializer(GeoFeatureModelSerializer, ObservationSerializer):
    class Meta(ObservationSerializer.Meta):
        geo_field = 'point_location'


class BirdObservationGeoJSONSerializer(
    GeoFeatureModelSerializer, BirdObservationSerializer
):
    class Meta(BirdObservationSerializer.Meta):
        geo_field = 'sighting__point_location'
