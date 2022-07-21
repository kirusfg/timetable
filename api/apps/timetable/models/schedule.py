from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator

from .section import Section
from .course import Course


class Schedule(models.Model):
    """
        The model represents a one of the student's saved schedule slots.
        There are 5 slots per user.
    """
    # The PositiveIntegerField starts from 0, and MaxValueValidator checks
    # if the value is *strictly* greater than max_value, hence the 4, not 5.
    slot = models.PositiveIntegerField(validators=[MaxValueValidator(4)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return 'ID: %s User: %s Slot: %s' % (
            self.id,
            self.user.username,
            self.slot,
        )


class ChosenCourse(models.Model):
    """
        The model represents a chosen course in one of the student's
        saved schedule slots.
    """
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)


class ChosenSection(models.Model):
    """
        The model represents a chosen section in one of the student's
        saved schedule slots.
    """
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
