from rest_framework_gis.serializers import GeoFeatureModelSerializer

from locations.models import GridTile
from locations.serializers import GridTileSerializer


class GridTileGeoJSONSerializer(GeoFeatureModelSerializer, GridTileSerializer):
    class Meta:
        model = GridTile
        geo_field = 'polygon'
        fields = '__all__'
