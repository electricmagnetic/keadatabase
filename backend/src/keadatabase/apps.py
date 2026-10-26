"""Application configuration for the Kea Database Django project."""

import atexit
import logging

from django.apps import AppConfig
from django.conf import settings
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from posthog import Posthog, identify_context

logger = logging.getLogger(__name__)

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

        missing = [
            name
            for name in ('POSTHOG_PROJECT_TOKEN', 'POSTHOG_HOST')
            if not getattr(settings, name)
        ]
        if missing:
            logger.warning(
                '%s not configured; PostHog is disabled and no events will be sent.',
                ', '.join(missing),
            )
            return

        posthog_client = Posthog(
            project_api_key=settings.POSTHOG_PROJECT_TOKEN,
            host=settings.POSTHOG_HOST,
            enable_exception_autocapture=True,
        )
        atexit.register(posthog_client.shutdown)
        configure_posthog_log_exporter()
