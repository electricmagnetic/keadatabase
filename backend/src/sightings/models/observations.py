""" Sightings models (contributor and media in other files) """

from django.contrib.gis.db import models
from django.core.validators import validate_slug

from .contributors import Contributor

PRECISION_CHOICES = (
    (10, '(10m) GPS Coordinates'),
    (50, '(50m) Known Location'),
    (200, '(200m) Approximate Location'),
    (1000, '(1000m) General Area'),
    (5000, '(5000m) Educated Guess'),
)

SIGHTING_TYPE_CHOICES = (
    ('sighted', 'Sighted'),
    ('heard', 'Heard'),
    ('distant', 'Sighted (distant)'),
)

STATUS_CHOICES = (
    ('new', 'New'),
    ('public', 'Verified (Public)'),
    (
        'Private', (
            ('private', 'Verified (Private)'),
            ('bad', 'Bad (Private)'),
        )
    ),
    (
        'Special', (
            ('fwf', 'FWF Observation'),
            ('kct', 'KCT Observation'),
            ('nztf', 'NZTF Observation'),
            ('captive', 'Captive Observation'),
        )
    ),
    (
        'Automated', (
            ('radio', 'Radio Tracking Observation'),
            ('camera', 'Trail Camera Observation'),
        )
    ),
)


class BaseSighting(models.Model):
    """ Sightings information common to sightings and non-sightings """

    contributor = models.OneToOneField(Contributor, on_delete=models.PROTECT)

    date_sighted = models.DateField()
    time_sighted = models.TimeField()

    region = models.CharField(max_length=50, blank=True, null=True)

    # Optional
    comments = models.TextField(blank=True)

    # Staff only
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='new',
        help_text="Moderator: confirm verification and private/public status"
    )

    moderator_notes = models.TextField(
        blank=True,
        help_text='Moderator: Add notes here if you needed to \
                                                  change sighting information (not public).'
    )

    # Metadata
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    ## TODO: Validate date_sighted is not from the future

    class Meta:
        abstract = True


class NonSighting(BaseSighting):
    """ Information specific to a non-sighting """
    location_details = models.TextField()

    # Optional
    expectations = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Non-sighting'
        ordering = [
            '-date_sighted',
            '-time_sighted',
        ]

    def __str__(self):
        return '%s %s' % (self.date_sighted, self.time_sighted)


class Sighting(BaseSighting):
    """ Information specific to a sighting """
    sighting_type = models.CharField(
        max_length=15, choices=SIGHTING_TYPE_CHOICES
    )

    point_location = models.PointField()
    precision = models.PositiveIntegerField(choices=PRECISION_CHOICES)

    number = models.PositiveIntegerField()

    # Optional
    location_details = models.TextField(blank=True)
    behaviour = models.TextField(blank=True)

    # Staff only
    favourite = models.BooleanField(
        default=False, help_text="Moderator: If noteworthy sighting"
    )
    confirmed = models.BooleanField(
        default=False,
        help_text="Moderator: If confirmed (known contributor or photo evidence)"
    )

    # Automated
    geocode = models.CharField(max_length=200, blank=True, null=True)

    # Import
    import_id = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        unique=True,
        validators=[validate_slug],
        verbose_name="Import ID"
    )

    ## TODO: Check number is greater than zero (should be an non-sighting otherwise)
    ## TODO: Check number is within bounds of New Zealand

    class Meta:
        verbose_name = 'Sighting'
        ordering = [
            '-date_sighted',
            '-time_sighted',
        ]

    def __str__(self):
        return '%s %d on %s %s' % (
            self.get_sighting_type_display(), self.number, self.date_sighted,
            self.time_sighted
        )
