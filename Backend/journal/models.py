from django.db import models
from problem.models import Problems
from accounts.models import CustomUser
# Create your models here.
class Journal(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    problem = models.ForeignKey(Problems, on_delete=models.CASCADE)
    content = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    def __str__(self):
        return self.title