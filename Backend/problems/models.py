from django.db import models
from accounts.models import CustomUser
# Create your models here.
class Problems(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(
                max_length=10,
                blank=True,
        choices=[
            ('easy', 'Easy'),
            ('medium', 'Medium'),
            ('hard', 'Hard')
        ]
    )
    
class Testcases(models.Model):
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    input = models.TextField()
    output = models.TextField()
    
class Submissions(models.Model):
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    code = models.TextField()
    username=models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    result = models.CharField(
        max_length=10,
        choices=[
            ('pass', 'Pass'),
            ('fail', 'Fail')
        ]
    )
    submitted_at = models.DateTimeField(auto_now_add=True)