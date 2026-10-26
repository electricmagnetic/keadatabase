"""Application configuration for the Kea Database Django project."""

import atexit
import logging

from django.apps import AppConfig
from django.conf import settings
from django.contrib.auth.signals import user_logged_in
from django.core.exceptions import ImproperlyConfigured
from django.dispatch import receiver
from posthog import Posthog, identify_context


posthog_client = None


def configure_posthog_log_exporter():
    """Export only records emitted through the dedicated PostHog logger."""
    from opentelemetry._logs import set_logger_provider
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
    from opentelemetry.sdk._logs.export import BatchLogRecordProcessor

    logger_provider = LoggerProvider()
    set_logger_provider(logger_provider)
    logger_provider.add_log_record_processor(
        BatchLogRecordProcessor(
            OTLPLogExporter(
                endpoint=f'{settings.POSTHOG_HOST.rstrip("/")}/i/v1/logs',
                headers={
                    'Authorization': f'Bearer {settings.POSTHOG_PROJECT_TOKEN}',
                },
            )
        )
    )

    posthog_logger = logging.getLogger('posthog.export')
    posthog_logger.setLevel(logging.INFO)
    posthog_logger.propagate = False
    posthog_logger.addHandler(LoggingHandler(logger_provider=logger_provider))
    atexit.register(logger_provider.shutdown)


@receiver(user_logged_in)
def identify_posthog_login(sender, request, user, **kwargs):
    """Identify the login request after Django has authenticated the user."""
    identify_context(str(user.pk))


class KeadatabaseConfig(AppConfig):
    name = 'keadatabase'

    def ready(self):
        """Initialize the process-wide PostHog client when Django starts."""
        global posthog_client

        if not settings.POSTHOG_PROJECT_TOKEN:
            if settings.DEBUG:
                raise ImproperlyConfigured(
                    'POSTHOG_PROJECT_TOKEN variable required by PostHog is missing '
                    'or un-configured, this causes events to be silently missed. '
                    'This error stops appearing once POSTHOG_PROJECT_TOKEN is configured'
                )
            return

        if not settings.POSTHOG_HOST:
            if settings.DEBUG:
                raise ImproperlyConfigured(
                    'POSTHOG_HOST variable required by PostHog is missing or '
                    'un-configured, this causes events to be silently missed. This '
                    'error stops appearing once POSTHOG_HOST is configured'
                )
            return

        posthog_client = Posthog(
            project_api_key=settings.POSTHOG_PROJECT_TOKEN,
            host=settings.POSTHOG_HOST,
            enable_exception_autocapture=True,
        )
        atexit.register(posthog_client.shutdown)
        configure_posthog_log_exporter()
