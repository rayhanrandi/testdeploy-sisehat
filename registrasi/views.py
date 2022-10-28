import re
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect, render
from registrasi.forms import MendaftarDokter, MendaftarPasien
from registrasi.models import Pasien

def daftar_pasien(request):
    form_mendaftar_pasien = MendaftarPasien()

    if request.method == "POST":
        user = UserCreationForm(request.POST)

        nomor_induk_kependudukan = request.POST.get("nomor_induk_kependudukan")

        angka_16_digit = "^\d{16}$"
        keabsahan_pengguna = re.search(angka_16_digit, nomor_induk_kependudukan)

        if user.is_valid() and keabsahan_pengguna != None:
            user = user.save()

            pasien = Pasien.objects.create(
                user = user,
                nomor_induk_kependudukan = nomor_induk_kependudukan
            )

            pasien.save()

            messages.success(request, 'Akun telah berhasil dibuat!')

    context = {'form_mendaftar_pasien':form_mendaftar_pasien}

    return render(request, "registrasi.html", context)

def daftar_dokter(request):
    pass
