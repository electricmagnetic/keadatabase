"""Custom DRF renderers."""

from rest_framework.renderers import BrowsableAPIRenderer


class BrowsableAPIRendererWithoutForms(BrowsableAPIRenderer):
    """Browsable API renderer that skips rendering HTML POST/PUT/PATCH forms
    and the raw-data form.
    """

    def get_context(self, *args, **kwargs):
        context = super().get_context(*args, **kwargs)
        context['display_edit_forms'] = False
        return context

    def show_form_for_method(self, view, method, request, obj):
        # Never attempt to build an HTML form for any HTTP method.
        return False

    def get_rendered_html_form(self, data, view, method, request):
        # Returning an empty string short-circuits the expensive form build.
        return ''

    def get_raw_data_form(self, data, view, method, request):
        # The raw-data form also iterates serializer fields; skip it too.
        return None
