from django_cron import CronJobBase, Schedule
from apps.registrar.utils import get_current_semester
from apps.timetable.models import Semester


class RegistrarSync(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'registrar.sync'

    def do(self):
        semester = get_current_semester()
        print(semester)

        [current_season, current_year] = semester['NAME'].split(' ')
        current_semester = Semester(
            semester['ID'], current_season, current_year)

        print(current_season)
        print(current_year)

        current_semester.save()
