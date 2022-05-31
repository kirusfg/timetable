from django_cron import CronJobBase, Schedule
from django.db import IntegrityError

from .utils import get_current_semester, get_courses
from ..timetable.models import Semester, Course


class RegistrarSync(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'registrar.sync'

    def do(self):
        semester: Semester = get_current_semester()

        try:
            semester.save()
        except IntegrityError:
            print('This semester already exists; continuing')

        courses: list[Course] = get_courses(semester)

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

            course.save()
