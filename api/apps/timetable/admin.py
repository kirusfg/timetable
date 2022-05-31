from django.contrib import admin

from .models import Course, Semester, AcademicLevel, Department, School


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['id', 'season', 'year']


@admin.register(AcademicLevel)
class AcademicLevelAdmin(admin.ModelAdmin):
    list_display = ['level']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['abbr', 'instance']


admin.site.register(Department)
admin.site.register(School)
