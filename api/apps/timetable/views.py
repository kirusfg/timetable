from rest_framework import viewsets, permissions, pagination

from .serializers import (
    CourseSerializer,
    SemesterSerializer,
    SectionSerializer,
)
from .models.common import Semester
from .models.course import Course
from .models.section import Section


class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000


class SemesterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = [permissions.AllowAny]


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = [permissions.AllowAny]


class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = [permissions.AllowAny]
