import requests
from requests import JSONDecodeError, Response
from typing import NamedTuple

from ..timetable.models import Semester, Course, School, AcademicLevel, Section


uri = 'https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json'


def print_response(res: Response):
    for attr in dir(res):
        print(attr, ': ', getattr(res, attr))


def get_current_semester() -> Semester:
    params = {
        'method': 'getSemesters',
    }

    res = requests.post(uri, params)

    try:
        semester = res.json()[0]
    except JSONDecodeError:
        print('Failed to parse the JSON in get_current_semester')

    _id = semester['ID']
    name = semester['NAME']

    return Semester(_id=_id, name=name)


def convert_course(course: dict) -> Course:
    school = School(
        id=course['SCHOOLID'],
        abbr=course['SCHOOLABBR'],
        name=course['SCHOOL'],
    )
    academic_level = AcademicLevel(
        id=course['ACADEMICLEVELID'],
        level=course['ACADEMICLEVEL'],
    )
    last_taught = Semester(
        _id=course['LASTTAUGHT'],
    )

    term = Semester(_id=None, name=course['TERMNAME'])

    return Course(
        id=course['COURSEID'],
        abbr=course['ABBR'],
        title=course['TITLE'],
        credits_us=course['CRUS'],
        credits_ects=course['CRECTS'],
        desc=course['SHORTDESC'],
        breadth=course['BREADTH'],
        ccdisplay=course['CCDISPLAY'],
        rno=course['RNO'],
        department=course['DEPARTMENT'],
        academic_level=academic_level,
        school=school,
        last_taught=last_taught,
        term=term,
    )


class SectionTitle(NamedTuple):
    number: int
    type: str


def _parse_title(title: str) -> SectionTitle:
    """The title is of format NT, where N is the number of the section,
    and T is its type. This function finds where to split the title and
    returns a tuple with the values of N and T."""
    i = 0
    for (index, c) in enumerate(title):
        if c.isalpha():
            i = index
            break

    number = title[:i]
    type = title[i:]

    return SectionTitle(number, type)


def convert_section(section: dict, course: Course) -> Section:
    instance = section['INSTANCEID']

    title = section['ST']
    (number, type) = _parse_title(title)

    days = section['DAYS']
    times = section['TIMES']
    room = section['ROOM']

    instructors = section['FACULTY']

    capacity = section['CAPACITY']
    enrolled = section['ENR']

    final_exam = section['FINALEXAM']

    return Section(
        instance,
        course.id,
        number,
        type,
        days,
        times,
        room,
        instructors,
        capacity,
        enrolled,
        final_exam
    )


def get_courses(semester: Semester) -> list[Course]:
    params = {
        'method': 'getSearchData',
        'searchParams[formSimple]': 'false',
        'searchParams[limit]': '1000',
        'searchParams[page]': '1',
        'searchParams[start]': '0',
        'searchParams[quickSearch]': '',
        'searchParams[sortField]': '-1',
        'searchParams[sortDescending]': '-1',
        'searchParams[semester]': semester._id,
        'searchParams[schools]': '',
        'searchParams[departments]': '',
        'searchParams[levels]': '',
        'searchParams[subjects]': '',
        'searchParams[instructors]': '',
        'searchParams[breadths]': '',
        'searchParams[abbrNum]': '',
        'searchParams[credit]': '',
    }

    res = requests.post(uri, params)

    try:
        courses = res.json()['data']
    except JSONDecodeError:
        print('Failed to parse the JSON in get_courses')
        print_response(res)

    courses = list(map(convert_course, courses))

    return courses


def get_sections(course: Course, semester: Semester) -> list[Section]:
    params = {
        'method': 'getSchedule',
        'termId': semester._id,
        'courseId': course.id,
    }

    res = requests.post(uri, params)

    try:
        sections = res.json()
    except JSONDecodeError:
        print('Failed to parse the JSON in get_section')
        print_response(res)
        print(params)

    sections = list(map(convert_section, sections, [course] * len(sections)))

    return sections
