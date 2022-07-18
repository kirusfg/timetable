from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .serializers import (
    CourseSerializer,
    SemesterSerializer,
    SectionSerializer,
    ScheduleSerializer,
    ChosenSectionSerializer,
)
from .models.common import Semester
from .models.course import Course
from .models.section import Section
from .models.schedule import Schedule, ChosenSection


class SemesterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [permissions.IsAdminUser]


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]


class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]
