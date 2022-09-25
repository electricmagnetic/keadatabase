from rest_framework import serializers

from sightings.models.observations import Sighting
from sightings.models.contributors import Contributor
from sightings.models.birds import BirdSighting


# Helpers
class ImportBirdObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirdSighting
        exclude = ('sighting', )


class ImportContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor
        fields = '__all__'


class ImportObservationSerializer(serializers.ModelSerializer):
    """ For admin/authenticated use """
    contributor = ImportContributorSerializer(many=False)
    birds = ImportBirdObservationSerializer(many=True)

    class Meta:
        model = Sighting
        exclude = (
            'geocode',
            'region',
        )

    def create(self, validated_data):
        contributor_data = validated_data.pop('contributor')
        birds_data = validated_data.pop('birds')

        contributor = Contributor.objects.create(**contributor_data)
        sighting = Sighting.objects.create(
            contributor=contributor, **validated_data
        )

        for bird_data in birds_data:
            BirdSighting.objects.create(sighting=sighting, **bird_data)

        return sighting
