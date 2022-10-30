from django.db import models
from registrasi.models import Dokter, Pasien

class Keluhan(models.Model):
    pasien = models.ForeignKey(Pasien, on_delete=models.DO_NOTHING)
    dokter = models.ForeignKey(Dokter, on_delete=models.DO_NOTHING)
    tanggal = models.DateField()
    tema = models.CharField(max_length=120)
    deskripsi = models.TextField()
