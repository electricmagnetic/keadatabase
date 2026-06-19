from rest_framework import pagination
from rest_framework_gis.pagination import GeoJsonPagination


class GridTilePagination(pagination.LimitOffsetPagination):
    default_limit = 434


class GridTileGeoJSONPagination(GeoJsonPagination):
    page_size = 434
    page_size_query_param = 'page_size'
    max_page_size = 10000


class SurveyPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 10000
