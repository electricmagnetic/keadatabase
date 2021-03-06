# Generated by Django 3.2.13 on 2022-07-18 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sightings', '0037_auto_20211117_1044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nonsighting',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('public', 'Verified (Public)'), ('Private', (('private', 'Verified (Private)'), ('bad', 'Bad (Private)'))), ('Special', (('fwf', 'FWF Observation'), ('kct', 'KCT Observation'), ('nztf', 'NZTF Observation'), ('captive', 'Captive Observation'), ('radio', 'Radio Tracking Observation')))], default='new', help_text='Moderator: confirm verification and private/public status', max_length=10),
        ),
        migrations.AlterField(
            model_name='sighting',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('public', 'Verified (Public)'), ('Private', (('private', 'Verified (Private)'), ('bad', 'Bad (Private)'))), ('Special', (('fwf', 'FWF Observation'), ('kct', 'KCT Observation'), ('nztf', 'NZTF Observation'), ('captive', 'Captive Observation'), ('radio', 'Radio Tracking Observation')))], default='new', help_text='Moderator: confirm verification and private/public status', max_length=10),
        ),
    ]
