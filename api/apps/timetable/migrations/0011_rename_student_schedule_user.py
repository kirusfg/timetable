# Generated by Django 4.0.4 on 2022-07-18 06:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0010_alter_schedule_student'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schedule',
            old_name='student',
            new_name='user',
        ),
    ]
