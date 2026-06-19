from django.contrib.gis import admin

from .models import Place, Region, StudyArea

admin.site.register(StudyArea)
admin.site.register(Region)
admin.site.register(Place)
