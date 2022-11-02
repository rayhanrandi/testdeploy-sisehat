from django.db import models

# Create your models here.
class Obat(models.Model):
    nama = models.CharField(max_length=120)
    produsen = models.CharField(max_length=120)
    deskripsi = models.TextField()
    efek_samping = models.TextField()