""" DRF router configuration """

from rest_framework.routers import DefaultRouter

from birds.views import BirdViewSet
from bands.views import BandComboViewSet
from sightings.views.observations import ObservationViewSet
from sightings.views.birds import BirdObservationViewSet
from sightings.views.media import ObservationsMediaViewSet
from geojson.views import ObservationGeoJSONViewSet, GridTileGeoJSONViewSet, BirdObservationGeoJSONViewSet
from report.views import ReportObservationViewSet
from report.views import ReportSurveyViewSet
from report.views import ImportObservationViewSet
from surveys.views import SurveyViewSet, SurveyHourViewSet, ObserverViewSet
from locations.views import GridTileViewSet
from analysis.views import GridTileAnalysisViewSet, SurveyAnalysisViewSet

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

# Survey endpoints
router.register(r'surveys/grid_tiles', GridTileViewSet, 'GridTile')
router.register(r'surveys/hours', SurveyHourViewSet, 'SurveyHour')
router.register(r'surveys/surveys', SurveyViewSet, 'Survey')
router.register(r'geojson/grid_tiles', GridTileGeoJSONViewSet, 'GridTileGeoJSON')
router.register(r'analysis/grid_tiles', GridTileAnalysisViewSet, 'GridTileAnalysis')
router.register(r'analysis/surveys', SurveyAnalysisViewSet, 'SurveyAnalysis')
router.register(r'report/survey', ReportSurveyViewSet, 'ReportSurveyViewSet')

# Permission required
router.register(r'surveys/observers', ObserverViewSet, 'Observer')
router.register(r'report/import', ImportObservationViewSet, 'ImportObservation')

# yapf: enable
