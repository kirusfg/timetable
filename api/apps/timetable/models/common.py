from django.db import models


class AcademicLevel(models.Model):
    id = models.IntegerField(primary_key=True)
    level = models.CharField(max_length=50)

    def __str__(self):
        return 'Academic level: %s' % (self.level)


class School(models.Model):
    id = models.IntegerField(primary_key=True)
    abbr = models.CharField(max_length=50)
    name = models.CharField(max_length=100)

    def __str__(self):
        return '[%s] %s' % (self.abbr, self.name)


class Semester(models.Model):
    _id = models.IntegerField(null=True, blank=True)
    name = models.CharField(primary_key=True, max_length=50)

    def __str__(self):
        return '%s' % (self.name)
