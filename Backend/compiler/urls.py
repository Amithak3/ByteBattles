from django.urls import path, include
from . import views
from rest_framework import routers
from .views import SubmissionViewSet

router = routers.DefaultRouter()
router.register(r'Submissions', SubmissionViewSet)

urlpatterns = [
    path('run/', views.run_code, name='run_code'),
    path('submit/' , views.submit_code, name='submit_code'),
    path('', include(router.urls))
]