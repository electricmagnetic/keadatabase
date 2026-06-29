from rest_framework import serializers

from surveys.models.observers import Observer
from surveys.models.surveys import Survey, SurveyHour


# Helpers
class SurveyHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyHour
        exclude = ('survey',)


class ObserverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observer
        # Exclude the user FK — it is set programmatically from request.user
        exclude = ('user',)
        extra_kwargs = {
            'name': {'required': False, 'allow_blank': True},
            'email': {'required': False, 'allow_blank': True},
        }


# Report serializers
class ReportSurveySerializer(serializers.ModelSerializer):
    hours = SurveyHourSerializer(many=True)
    observer = ObserverSerializer(many=False)
    challenge = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Survey
        exclude = ('status',)

    def _request_user(self):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            return request.user
        return None

    def to_internal_value(self, data):
        """Set both empty strings and 0 to null for max_flock_size"""
        if data.get('max_flock_size', None) == '':
            data.pop('max_flock_size')
        if data.get('max_flock_size', None) == 0:
            data.pop('max_flock_size')
        return super().to_internal_value(data)

    def validate(self, data):
        # Very simple challenge
        if data.pop('challenge', None) != 'kea':
            raise serializers.ValidationError('Invalid submission')

        # if the request is authenticated, name and email are optional
        if not self._request_user():
            observer = data.get('observer', {})
            errors = {}
            if not observer.get('name'):
                errors['name'] = 'Name is required.'
            if not observer.get('email'):
                errors['email'] = 'Email is required.'
            if errors:
                raise serializers.ValidationError({'observer': errors})

        return data

    def create(self, validated_data):
        observer_data = validated_data.pop('observer')
        hours_data = validated_data.pop('hours')
        user = self._request_user()

        # overwrite the name and email with the user (if authenticated)
        # (even though this is a double-up, it's to retain backwards compatability with the current front-end)
        if user is not None:
            observer_data['name'] = user.get_full_name() or user.get_username()
            observer_data['email'] = user.email
            observer = Observer.objects.create(user=user, **observer_data)
        else:
            observer = Observer.objects.create(**observer_data)

        survey = Survey.objects.create(observer=observer, **validated_data)

        for hour_data in hours_data:
            SurveyHour.objects.create(survey=survey, **hour_data)

        return survey
