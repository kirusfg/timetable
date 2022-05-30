from django.db import models


class AcademicLevel(models.Model):
    id = models.IntegerField(primary_key=True)
    level = models.CharField(max_length=50)


class Department(models.Model):
    name = models.CharField(max_length=50)


class School(models.Model):
    id = models.IntegerField(primary_key=True)
    abbr = models.CharField(max_length=50)
    name = models.CharField(max_length=100)


class Semester(models.Model):
    id = models.IntegerField(primary_key=True)
    season = models.CharField(max_length=10)
    year = models.IntegerField()


class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    instance = models.IntegerField()

    abbr = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    desc = models.CharField(max_length=1000)

    last_taught = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name='+')
    term = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name='+')

    credits_ects = models.IntegerField()
    credits_us = models.IntegerField()

    academic_level = models.ForeignKey(
        AcademicLevel,
        on_delete=models.DO_NOTHING,
        to_field='id',
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.DO_NOTHING,
    )

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
