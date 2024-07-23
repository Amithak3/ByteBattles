"""
URL configuration for _code_on_ project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from problem.views import ProblemViewSet, TestcaseViewSet
from rest_framework import routers # type: ignore
from django.urls import include

router = routers.DefaultRouter()
router.register(r'problems-api', ProblemViewSet)
router.register(r'testcases-api', TestcaseViewSet)

urlpatterns = [
    path('', include(router.urls))
]
