"""timetable URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers

from apps.users import views as users_views
from apps.timetable import views as timetable_views
from apps.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'students', users_views.StudentViewSet)
router.register(r'semesters', timetable_views.SemesterViewSet)
router.register(r'courses', timetable_views.CourseViewSet)
router.register(r'sections', timetable_views.SectionViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path(
        'api/v1/auth/',
        auth_views.GoogleLogin.as_view(),
        name='google_login'
    ),
    path('api/v1/auth/registration/',
         include('dj_rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
]
