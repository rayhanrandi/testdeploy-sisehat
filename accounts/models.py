from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator

class UserManager(BaseUserManager):
    def create_user(self, nomor_induk_kependudukan, nama_pengguna="kosong", password=None, staff=False, admin=False):
        if not nomor_induk_kependudukan:
            raise ValueError("Tolong isi Nomor Induk Kependudukan!")

        if not nama_pengguna:
            raise ValueError("Tolong isi nama")

        user_obj = self.model(nomor_induk_kependudukan=nomor_induk_kependudukan,nama_pengguna=nama_pengguna)

        user_obj.set_password(password)
        user_obj.save(using=self._db)

        return user_obj

    def create_staffuser(self, nama_pengguna="kosong", password=None):
        user = self.create_user(nomor_induk_kependudukan="kosong", nama_pengguna=nama_pengguna, password=password, staff=True)

        return user

    def create_superuser(self, nama_pengguna="kosong", password=None):
        user = self.create_user(nomor_induk_kependudukan="kosong", nama_pengguna=nama_pengguna, password=password, staff=True, admin=True)

        return user

class User(AbstractBaseUser):
    # atribut umum
    nomor_induk_kependudukan = models.BigIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], primary_key=True)
    nama_pengguna = models.CharField(max_length=64)

    # atribut django
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'nomor_induk_kependudukan'

    REQUIRED_FIELDS = ['nama_pengguna']

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
