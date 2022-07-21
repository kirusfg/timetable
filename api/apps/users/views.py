from .serializers import UserSerializer
from django.contrib.auth.models import User

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.timetable.models.schedule import Schedule, ChosenSection, ChosenCourse
from apps.timetable.serializers import ChosenSectionSerializer, ChosenCourseSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'username'

    @action(detail=True)
    def schedules(self, request, username=None):
        user = self.get_object()
        schedules = Schedule.objects.filter(user=user)

        response = {}
        for i, schedule in enumerate(schedules):
            response[schedule.id] = {'courses': [], 'sections': []}

            chosen_courses = ChosenCourse.objects.filter(schedule=schedule)
            chosen_courses_serializer = ChosenCourseSerializer(
                chosen_courses, many=True
            )
            response[schedule.id]['courses'] = [
                cc['course'] for cc in chosen_courses_serializer.data
            ]

            chosen_sections = ChosenSection.objects.filter(schedule=schedule)
            chosen_sections_serializer = ChosenSectionSerializer(
                chosen_sections, many=True)
            response[schedule.id]['sections'] = [
                cs['section'] for cs in chosen_sections_serializer.data
            ]

        return Response(response)
