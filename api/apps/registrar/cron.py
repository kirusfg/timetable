from django_cron import CronJobBase, Schedule
from django.db import IntegrityError

from .utils import get_current_semester, get_courses, get_sections


class RegistrarSync(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'registrar.sync'

    def do(self):
        current_semester = get_current_semester()

        try:
            current_semester.save()
        except IntegrityError:
            print('This semester already exists; continuing')

        courses = get_courses(current_semester)

        for course in courses:
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

            sections = get_sections(course, current_semester)

            for section in sections:
                section.save()

            course.instance = sections[0].instance

            course.save()
