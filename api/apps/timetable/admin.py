from django.contrib import admin

from .models.common import Semester, AcademicLevel, School
from .models.course import Course
from .models.section import Section
from .models.schedule import Schedule, ChosenSection


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['name', '_id']


@admin.register(AcademicLevel)
class AcademicLevelAdmin(admin.ModelAdmin):
    list_display = ['level']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['abbr', 'instance']


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ['abbr', 'name']


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['course', 'type', 'number']


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['slot', 'user']


@admin.register(ChosenSection)
class ChosenSectionAdmin(admin.ModelAdmin):
    list_display = ['schedule', 'section']
