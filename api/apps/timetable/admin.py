from django.contrib import admin

from .models import Course, Semester, AcademicLevel, School


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['name', '_id']


@admin.register(AcademicLevel)
class AcademicLevelAdmin(admin.ModelAdmin):
    list_display = ['level']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['abbr', 'instance']


admin.site.register(School)
