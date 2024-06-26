from django.db import models
from problems.models import Problems
from accounts.models import CustomUser
# Create your models here.

class Submissions(models.Model):
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    code = models.TextField()
    language = models.CharField(
        max_length=10,
        choices=[
            ('python', 'Python'),
            ('java', 'Java'),
            ('c', 'C'),
            ('cpp', 'C++')
        ]
    )
    username=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    result = models.CharField(
        max_length=10,
        choices=[
            ('pass', 'Pass'),
            ('fail', 'Fail')
        ]
    )
    submitted_at = models.DateTimeField(auto_now_add=True)