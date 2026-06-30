"""DRF router configuration"""

from rest_framework.routers import DefaultRouter

from bands.views import BandComboViewSet
from birds.views import BirdViewSet
from geojson.views import (
    BirdObservationGeoJSONViewSet,
    ObservationGeoJSONViewSet,
)
from report.views import (
    ImportObservationViewSet,
    ReportObservationViewSet,
)
from sightings.views.birds import BirdObservationViewSet
from sightings.views.media import ObservationsMediaViewSet
from sightings.views.observations import ObservationViewSet

router = DefaultRouter()

# yapf: disable
# Base endpoints
router.register(r'band_combos', BandComboViewSet, 'BandCombo')
router.register(r'birds', BirdViewSet, 'Bird')

router.register(r'observations', ObservationViewSet, 'Observation')
router.register(r'bird_observations', BirdObservationViewSet, 'BirdObservation')
router.register(r'media', ObservationsMediaViewSet, 'ObservationMedia')
router.register(r'geojson/observations', ObservationGeoJSONViewSet, 'ObservationGeoJSON')
router.register(r'geojson/bird_observations', BirdObservationGeoJSONViewSet, 'BirdObservationGeoJSON')
router.register(r'report/observation', ReportObservationViewSet, 'ReportObservation')

# Permission required
router.register(r'report/import', ImportObservationViewSet, 'ImportObservation')

# yapf: enable
