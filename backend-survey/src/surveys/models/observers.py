from django.conf import settings
from django.db import models


class Observer(models.Model):
    """Observer details for a particular survey"""

    # Linked user account (set when survey is submitted while authenticated)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='survey_observers',
    )

    # Name and email are optional when a user account is linked
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, blank=True)

    def __str__(self):
        if self.user:
            return self.user.get_full_name() or self.user.username
        return self.name
