# from django.db import models

# # Create your models here.

# class Contest(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=50)
#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField()
#     duration = models.DurationField()
#     description = models.TextField()
#     problems = models.ManyToManyField('problem.Problems')
#     def __str__(self):
#         return self.name