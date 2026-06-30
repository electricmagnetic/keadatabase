"""DRF router configuration"""

from rest_framework.routers import DefaultRouter

from analysis.views import GridTileAnalysisViewSet, SurveyAnalysisViewSet
from geojson.views import (
    GridTileGeoJSONViewSet,
)
from locations.views import GridTileViewSet
from report.views import (
    ReportSurveyViewSet,
)
from surveys.views import ObserverViewSet, SurveyHourViewSet, SurveyViewSet

router = DefaultRouter()

# yapf: disable
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

# yapf: enable
