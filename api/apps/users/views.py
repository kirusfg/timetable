from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.timetable.models.schedule import Schedule
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]
    # lookup_field = 'username'

    @action(detail=True)
    def schedules(self, request, pk=None):
        student = self.get_object()
        schedules = [s for s in Schedule.objects.all() if s.student == student]
        return Response({
            'count': len(schedules),
            'next': 'null',
            'previous': 'null',
            'results': schedules,
        })
