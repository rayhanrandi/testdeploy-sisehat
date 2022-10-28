from accounts.admin import UserCreationForm
from django.db import transaction

from accounts.models import Dokter, Pasien, User

class MendaftarPasien(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.adalah_pasien = True
        user.save()
        Pasien.objects.create(user=user)
        return user

class MendaftarDokter(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.adalah_dokter = True
        user.save()
        Dokter.objects.create(user=user)
        return user
