from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class MendaftarPasien(UserCreationForm):
    nomor_induk_kependudukan = forms.CharField(min_length=16, max_length=16)


    class Meta(UserCreationForm.Meta):
        model = User

        membuat_kata_sandi = "password" + "1"
        memastikan_kata_sandi = "password" + "2"

        fields = ("username", "nomor_induk_kependudukan", membuat_kata_sandi, memastikan_kata_sandi)

class MendaftarDokter(UserCreationForm):
    nomor_induk_kependudukan = forms.CharField(min_length=16, max_length=16)
    nama_rumah_sakit = forms.CharField(max_length=128)


    class Meta(UserCreationForm.Meta):
        model = User

        membuat_kata_sandi = "password" + "1"
        memastikan_kata_sandi = "password" + "2"

        fields = ("username", "nomor_induk_kependudukan", "nama_rumah_sakit", membuat_kata_sandi, memastikan_kata_sandi)
