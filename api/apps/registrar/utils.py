import requests
from requests import JSONDecodeError, Response

from ..timetable.models import Semester, Course, School, AcademicLevel

uri = 'https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json'

section_dict = {
    'L': 'Lecture',
    'T': 'Tutorial',
    'Lb': 'Lab',
    'PLb': 'PhysLab',
    'BLb': 'BioLab',
    'ChLb': 'ChemLab',
    'CLb': 'CompLab',
    'S': 'Seminar',
    'R': 'Recitation',
    'IS': 'IS',
    'P': 'P',
    'Wsh': 'Wsh',
    'CP': 'CP',
}


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
