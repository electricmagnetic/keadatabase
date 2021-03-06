# Generated by Django 3.2.5 on 2021-11-16 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sightings', '0036_auto_20210121_1746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nonsighting',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('public', 'Verified (Public)'), ('Private', (('private', 'Verified (Private)'), ('bad', 'Bad (Private)'))), ('Special', (('fwf', 'FWF Observation'), ('kct', 'KCT Observation'), ('nztf', 'NZTF Observation'), ('captive', 'Captive Observation')))], default='new', help_text='Moderator: confirm verification and private/public status', max_length=10),
        ),
        migrations.AlterField(
            model_name='sighting',
            name='status',
            field=models.CharField(choices=[('new', 'New'), ('public', 'Verified (Public)'), ('Private', (('private', 'Verified (Private)'), ('bad', 'Bad (Private)'))), ('Special', (('fwf', 'FWF Observation'), ('kct', 'KCT Observation'), ('nztf', 'NZTF Observation'), ('captive', 'Captive Observation')))], default='new', help_text='Moderator: confirm verification and private/public status', max_length=10),
        ),
    ]
