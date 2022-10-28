from django.db import models
from django.contrib.auth.models import User


class Pasien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nomor_induk_kependudukan = models.CharField(max_length=16, primary_key=True)

    status_pasien = True
    status_dokter = False


class Dokter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nomor_induk_kependudukan = models.CharField(max_length=16, primary_key=True)
    nama_rumah_sakit = models.CharField(max_length=128)

    status_pasien = False
    status_dokter = True
