from django.contrib.gis import admin

from .models import GridTile


class GridTileAdmin(admin.ModelAdmin):
    """Read only view of grid tiles"""

    list_display = ('id',)
    search_fields = ('id',)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


admin.site.register(GridTile, GridTileAdmin)
