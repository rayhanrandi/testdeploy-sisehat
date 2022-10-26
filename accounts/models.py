from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator

# jangkauan nomor_induk_kependudukan
nomor_terkecil = 2_000_000_000_000_000; nomor_terbesar = 10_000_000_000_000_000

class UserManager(BaseUserManager):
    def create_user(self, nama_pengguna="kosong", password=None):
        if not nama_pengguna:
            raise ValueError("Tolong isi nama")

        user_obj = self.model(
            nama_pengguna=nama_pengguna,
            is_staff=False,
            is_admin=False
        )

        user_obj.set_password(password)
        user_obj.save(using=self._db)

        return user_obj

    def create_staffuser(self, nama_pengguna="kosong", password=None):
        user = self.create_user(
            nama_pengguna=nama_pengguna,
            password=password,
            is_staff=True,
            is_admin=False
        )

        user.save(using=self._db)
        return user

    def create_superuser(self, nama_pengguna="kosong", password=None):
        user = self.create_user(
            nama_pengguna=nama_pengguna,
            password=password,
            is_staff=True,
            is_admin=True
        )

        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    nama_pengguna = models.CharField(max_length=64)

    # atribut django
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'nama_pengguna'
    REQUIRED_FIELDS = []

    object = UserManager()

    def __str__(self):
        return self.nomor_induk_kependudukan

    def get_full_name(self):
        return self.nama_pengguna

    def get_short_name(self):
        return self.nama_pengguna

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

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
