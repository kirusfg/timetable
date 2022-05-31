from django.db import models
from django.contrib.auth.models import User

from apps.timetable.models import AcademicLevel


class Student(User):
    year_of_study = models.IntegerField()
    academic_level = models.ForeignKey(
        AcademicLevel, on_delete=models.DO_NOTHING)
