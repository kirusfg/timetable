from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'year_of_study',
            'academic_level'
        ]
