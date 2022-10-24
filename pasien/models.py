import datetime
from django.db import models

class Keluhan(models.Model):
    date = models.DateField(datetime.now, default=datetime.now)
    tema = models.CharField(max_length=120)
    deskripsi = models.TextField()
