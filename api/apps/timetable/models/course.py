from django.db import models

from .common import Semester, AcademicLevel, School


class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    instance = models.IntegerField(blank=True, null=True)

    abbr = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    desc = models.CharField(max_length=1000)

    last_taught = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name='+'
    )
    term = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name='+'
    )

    credits_ects = models.DecimalField(max_digits=4, decimal_places=2)
    credits_us = models.DecimalField(max_digits=4, decimal_places=2)

    academic_level = models.ForeignKey(
        AcademicLevel,
        on_delete=models.DO_NOTHING,
        to_field='id',
    )

    department = models.CharField(max_length=50)

    school = models.ForeignKey(
        School,
        on_delete=models.DO_NOTHING,
    )

    antireqs = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='+',
        blank=True,
        null=True
    )
    coreqs = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='+',
        blank=True,
        null=True
    )
    prereqs = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='+',
        blank=True,
        null=True
    )

    breadth = models.CharField(max_length=50)
    ccdisplay = models.BooleanField()
    rno = models.IntegerField()

    def __str__(self):
        return 'ID: %s Abbr: %s' % (self.id, self.abbr)
