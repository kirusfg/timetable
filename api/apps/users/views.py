from django.contrib.auth.models import User

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.timetable.models.schedule import Schedule, ChosenSection
from apps.timetable.serializers import ChosenSectionSerializer
from .serializers import UserSerializer


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
            chosen_sections = ChosenSection.objects.filter(schedule=schedule)
            serializer = ChosenSectionSerializer(chosen_sections, many=True)
            response[i] = [cs['section'] for cs in serializer.data]

        return Response(response)
