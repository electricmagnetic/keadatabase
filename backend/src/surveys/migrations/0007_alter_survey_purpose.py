# Generated by Django 3.2.5 on 2021-11-16 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0006_remove_observer_purpose'),
    ]

    operations = [
        migrations.AlterField(
            model_name='survey',
            name='purpose',
            field=models.CharField(blank=True, choices=[('', ''), ('tunnel', 'Tracking Tunnel Check'), ('fwf', 'FWF Hunting'), ('hunt', 'Hunting'), ('guide', 'Guiding'), ('trap', 'Trapping'), ('permolat', 'Permolat/Hut/Track Work'), ('tramp', 'Tramping'), ('research', 'Researching'), ('kea', 'Kea Surveying'), ('hut', 'Hut Wardening'), ('cycle', 'Bike/Cycle Touring'), ('other', 'Other')], default='', max_length=15),
        ),
    ]
