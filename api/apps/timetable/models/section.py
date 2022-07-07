from django.db import models

from .course import Course


section_dict = {
    'L': 'Lecture',
    'T': 'Tutorial',
    'Lb': 'Lab',
    'PLb': 'Physics Lab',
    'BLb': 'Biology Lab',
    'ChLb': 'Chemistry Lab',
    'CLb': 'Computer Lab',
    'S': 'Seminar',
    'R': 'Recitation',
    'IS': 'Independent Study',
    'P': 'Project',
    'Wsh': 'Workshop',
    'CP': 'Capstone Project',
    'Int': 'Internship',
    'ThDef': 'Thesis Defence',
    'OCA': 'Occupational Competency Assessment',
}


days_dict = {
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'R': 'Thursday',
    'F': 'Friday',
    'S': 'Saturday',
}


class Section(models.Model):
    instance = models.IntegerField(primary_key=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='+'
    )

    number = models.IntegerField()

    SECTION_TYPES = [(short, full) for short, full in section_dict.items()]
    type = models.CharField(max_length=10, choices=SECTION_TYPES)

    days = models.CharField(max_length=30)
    times = models.CharField(max_length=30)
    room = models.CharField(max_length=30)

    # TODO: create an Instructor model and parse the string
    instructors = models.CharField(max_length=200)

    capacity = models.IntegerField()
    enrolled = models.IntegerField()

    final_exam = models.BooleanField()

    def __str__(self):
        return '%s' % (self.course.abbr)
