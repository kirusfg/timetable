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


class Season(models.Model):
    SEASON_CHOICES = [
        ('F', 'Fall'),
        ('SP', 'Spring'),
        ('SM', 'Summer'),
    ]
    season = models.CharField(
        max_length=2,
        choices=SEASON_CHOICES,
    )


class Semester(models.Model):
    id = models.IntegerField(primary_key=True)
    year = models.DateField()
    season = models.ForeignKey(Season)


class Course(models.Model):
    id = models.IntegerField(primary_key=True)
    instance = models.IntegerField()

    abbr = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    desc = models.CharField(max_length=1000)

    last_taught = models.ForeignKey(Semester)
    term = models.ForeignKey(Semester)

    credits_ects = models.IntegerField()
    credits_us = models.IntegerField()

    academic_level = models.ForeignKey(
        AcademicLevel,
        on_delete=models.DO_NOTHING,
        to_field=id,
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.DO_NOTHING,
    )

    school = models.ForeignKey(
        School,
        on_delete=models.DO_NOTHING,
    )

    antireq = models.ForeignKey('self', on_delete=models.CASCADE)
    coreq = models.ForeignKey('self', on_delete=models.CASCADE)
    prereq = models.ForeignKey('self', on_delete=models.CASCADE)

    breadth = models.CharField(max_length=50)
    ccdisplay = models.BooleanField()
    rno = models.IntegerField()
