from django.db import models


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    comment = models.CharField(max_length=1000)
    completion_date = models.CharField(max_length=15)

