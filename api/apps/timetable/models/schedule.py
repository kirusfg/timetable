from django.db import models
from django.core.validators import MaxValueValidator

from apps.users.models import Student
from .section import Section


class Schedule(models.Model):
    """
        The model represents a one of the student's saved schedule slots.
        There are 5 slots per user.
    """
    # The PositiveIntegerField starts from 0, and MaxValueValidator checks
    # if the value is *strictly* greater than max_value, hence the 4, not 5.
    slot = models.PositiveIntegerField(validators=[MaxValueValidator(4)])
    student = models.ForeignKey(Student, on_delete=models.CASCADE)


class ChosenSection(models.Model):
    """
        The model presents a chosen section in one of the student's
        saved schedule slots.
    """
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
