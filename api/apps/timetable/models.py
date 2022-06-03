from django.db import models


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
    'Wsh': 'Wsh',
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
        return '%s' % (self.abbr)
        # return '{\
        #     id: %s\
        #     instance: %s\
        #     abbr: %s\
        #     title: %s\
        #     desc: %s\
        #     last_taught: %s\
        #     term: %s\
        #     credits_ects: %s\
        #     credits_us: %s\
        #     academic_level: %s\
        #     department: %s\
        #     school: %s\
        #     antireqs: %s\
        #     coreqs: %s\
        #     prereqs: %s\
        #     breadth: %s\
        #     ccdisplay: %s\
        #     rno: %s\
        # }' % (
        #     self.id,
        #     self.instance,
        #     self.abbr,
        #     self.title,
        #     self.desc,
        #     self.last_taught,
        #     self.term,
        #     self.credits_ects,
        #     self.credits_us,
        #     self.academic_level,
        #     self.department,
        #     self.school,
        #     self.antireqs,
        #     self.coreqs,
        #     self.prereqs,
        #     self.breadth,
        #     self.ccdisplay,
        #     self.rno,
        # )


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
