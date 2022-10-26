from accounts.admin import UserCreationForm
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models, transaction

from accounts.models import Dokter, Pasien, User

# jangkauan nomor_induk_kependudukan
nomor_terkecil = 2_000_000_000_000_000; nomor_terbesar = 10_000_000_000_000_000

class MendaftarPasien(UserCreationForm):
    nomor_induk_kependudukan = models.BigIntegerField(validators=[MinValueValidator(nomor_terkecil),MaxValueValidator(nomor_terbesar)], primary_key=True)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('nomor_induk_kependudukan',)

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.save()

        nomor_induk_kependudukan = self.cleaned_data.get("nomor_induk_kependudukan")
        
        pasien = Pasien.objects.create(
            user=user,
            nomor_induk_kependudukan=nomor_induk_kependudukan,
        )
        pasien.save()

        return user

class MendaftarDokter(UserCreationForm):
    nomor_induk_kependudukan = models.BigIntegerField(validators=[MinValueValidator(nomor_terkecil),MaxValueValidator(nomor_terbesar)], primary_key=True)
    nama_rumah_sakit = models.CharField(max_length=128)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('nomor_induk_kependudukan', 'nama_rumah_sakit')

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.save()

        nomor_induk_kependudukan = self.cleaned_data.get("nomor_induk_kependudukan")
        nama_rumah_sakit = self.cleaned_data.get("nama_rumah_sakit")

        dokter = Dokter.objects.create(
            user=user,
            nomor_induk_kependudukan=nomor_induk_kependudukan,
            nama_rumah_sakit=nama_rumah_sakit
        )
        dokter.save()

        return user
