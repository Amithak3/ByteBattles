from django.urls import path
from .views import SubmitCodeAPIView

urlpatterns = [
    # path('run/' )
    path('submit/' , SubmitCodeAPIView.as_view(), name='submit_code')
]