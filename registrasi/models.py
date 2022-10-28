from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# jangkauan nomor_induk_kependudukan
nomor_terkecil = 2_000_000_000_000_000; nomor_terbesar = 10_000_000_000_000_000

class Pasien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nomor_induk_kependudukan = models.BigIntegerField(validators=[MinValueValidator(nomor_terkecil),MaxValueValidator(nomor_terbesar)], primary_key=True)

    status_pasien = True
    status_dokter = False

class Dokter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nomor_induk_kependudukan = models.BigIntegerField(validators=[MinValueValidator(nomor_terkecil),MaxValueValidator(nomor_terbesar)], primary_key=True)
    nama_rumah_sakit = models.CharField(max_length=128)

    status_pasien = False
    status_dokter = True
