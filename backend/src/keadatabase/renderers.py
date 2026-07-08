"""Custom DRF renderers."""

from rest_framework.renderers import BrowsableAPIRenderer


class BrowsableAPIRendererWithoutForms(BrowsableAPIRenderer):
    """Browsable API renderer that skips rendering HTML forms on list views,
    where there is no single instance to bind a form to (e.g. the "create"
    form on /observations/), but restores the usual PUT/PATCH/DELETE edit
    forms on detail views for an individual instance (e.g. /observations/<id>/).
    """

    def show_form_for_method(self, view, method, request, obj):
        if obj is None:
            # There's no single instance to edit here (e.g. the list view's
            # create form), so don't bother building one.
            return False
        return super().show_form_for_method(view, method, request, obj)
