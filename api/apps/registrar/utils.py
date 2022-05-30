import requests
from requests import JSONDecodeError

uri = 'https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json'

params = {
    'method': 'getSearchData',
    'searchParams[formSimple]': 'false',
    'searchParams[limit]': '10000',
    'searchParams[page]': '1',
    'searchParams[start]': '0',
    'searchParams[quickSearch]': '',
    'searchParams[sortField]': '-1',
    'searchParams[sortDescending]': '-1',
    # 'searchParams[semester]': term,
    'searchParams[schools]': ['4', '5', '9', '11', '12', '13'],
    'searchParams[departments]': '',
    'searchParams[levels][]': '1',
    'searchParams[subjects]': '',
    'searchParams[instructors]': '',
    'searchParams[breadths]': '',
    'searchParams[abbrNum]': '',
    'searchParams[credit]': '',
}

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


def get_current_semester():
    params = {
        'method': 'getSemesters',
    }

    res = requests.get(uri, params)

    try:
        return res.json()[0]
    except JSONDecodeError:
        print('Failed to parse the JSON in get_current_semester')
