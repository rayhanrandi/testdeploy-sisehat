from enum import auto
from django.db import models
from registrasi.models import Pasien

# Create your models here.

class Penyakit(models.Model):
    user = models.ForeignKey(Pasien, on_delete=models.CASCADE)
    nama_penyakit = models.CharField(max_length=255)
    tanggal_diagnosis = models.DateField(auto_now_add=True)
    deskripsi_keluhan = models.TextField()
    sembuh = models.BooleanField(default=False)
