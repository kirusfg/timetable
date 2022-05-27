from django.contrib import admin

from .models import Course, Semester, AcademicLevel, Department, School, Season

admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(AcademicLevel)
admin.site.register(Department)
admin.site.register(School)
admin.site.register(Season)
