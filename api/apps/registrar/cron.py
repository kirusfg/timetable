from django_cron import CronJobBase, Schedule
from django.db import IntegrityError

from .utils import get_current_semester, get_courses, get_sections
from ..timetable.models import Semester, Course


class RegistrarSync(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'registrar.sync'

    def do(self):
        current_semester: Semester = get_current_semester()

        try:
            current_semester.save()
        except IntegrityError:
            print('This semester already exists; continuing')

        courses: list[Course] = get_courses(current_semester)

        for course in courses:
            print(course)

            try:
                course.term.save()
            except IntegrityError:
                print('This semester already exists; continuing')

            try:
                course.last_taught.save()
            except IntegrityError:
                print('This semester already exists; continuing')

            course.school.save()
            course.academic_level.save()

            # Get the schedule for this course
            sections = get_sections(course, current_semester)

            for section in sections:
                print('%s %s' % (section.number, section.type))

            course.save()
