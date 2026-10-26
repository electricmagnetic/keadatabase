"""Request logging (see ``client_ip`` for IP resolution)."""

import logging

from .client_ip import get_client_ip

# Records on this logger are exported to PostHog (see ``apps.py``).
posthog_log = logging.getLogger('posthog.export')


class RequestLoggingMiddleware:
    """Log every request, including the client IP, to PostHog."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = get_client_ip(request)
        request.client_ip = ip

        response = self.get_response(request)

        posthog_log.info(
            'request',
            extra={
                'event': 'request',
                'client_ip': ip,
                'method': request.method,
                'path': request.path,
                'status': response.status_code,
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
            },
        )
        return response
