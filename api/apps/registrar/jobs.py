from django.db import IntegrityError
from django_apscheduler import util

from .utils import get_current_semester, get_courses, get_sections


@util.close_old_connections
def fetch_data():
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
