from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField

GRIDTILE_LARGE_IMAGE_URL = 'https://geo.keadatabase.nz/tiles/'
GRIDTILE_SMALL_IMAGE_URL = 'https://geo.keadatabase.nz/small/'
GRIDTILE_IMAGE_TYPE = '.png'


class GridTile(models.Model):
    """Kea survey grid tile (5km by 5km)"""

    id = models.CharField(primary_key=True, max_length=7)

    min = models.PointField(srid=2193)
    max = models.PointField(srid=2193)

    centroid = models.PointField(srid=4326)
    polygon = models.PolygonField(srid=4326)

    neighbours = ArrayField(models.CharField(max_length=7), size=8)

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['id']

    def get_large_image(self):
        """Return URL for large image"""
        return '%s%s%s' % (GRIDTILE_LARGE_IMAGE_URL, self.id, GRIDTILE_IMAGE_TYPE)

    def get_small_image(self):
        """Return URL for small image"""
        return '%s%s%s' % (GRIDTILE_SMALL_IMAGE_URL, self.id, GRIDTILE_IMAGE_TYPE)
