from rest_framework import serializers

from .models.common import Semester
from .models.course import Course
from .models.section import Section
from .models.schedule import Schedule, ChosenCourse, ChosenSection


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class ChosenSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenSection
        fields = '__all__'
        depth = 1


class ChosenCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenCourse
        fields = '__all__'
        depth = 1
