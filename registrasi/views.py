import datetime
import re

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render

from registrasi.forms import HalamanMasuk, MendaftarDokter, MendaftarPasien
from registrasi.models import Dokter, Pasien

def halaman_registrasi(request):
    return render(request, 'halaman_registrasi.html', {})

def registrasi_pasien(request):
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

    return render(request, "registrasi_pasien.html", context)

def registrasi_dokter(request):
    form_mendaftar_dokter = MendaftarDokter()

    if request.method == "POST":
        user = UserCreationForm(request.POST)

        nomor_induk_kependudukan = request.POST.get("nomor_induk_kependudukan")
        
        nama_rumah_sakit = request.POST.get("nama_rumah_sakit")

        angka_16_digit = "^\d{16}$"
        keabsahan_pengguna = re.search(angka_16_digit, nomor_induk_kependudukan)

        print(user.errors)
        if user.is_valid() and keabsahan_pengguna != None:
            user = user.save()

            dokter = Dokter.objects.create(
                user = user,
                nomor_induk_kependudukan = nomor_induk_kependudukan,
                nama_rumah_sakit = nama_rumah_sakit
            )

            dokter.save()

            messages.success(request, 'Akun telah berhasil dibuat!')

    context = {'form_mendaftar_dokter':form_mendaftar_dokter}

    return render(request, "registrasi_dokter.html", context)

def halaman_masuk(request):
    return render(request, 'halaman_masuk.html', {})

def pasien_masuk(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        try:
            pasien = Pasien.objects.get(user=user)
        except Pasien.DoesNotExist:
            pasien = None

        if user != None and pasien != None:
            login(request, user)
            response = HttpResponseRedirect("/pasien/riwayat/")
            response.set_cookie('username', username)
            response.set_cookie('user_type', 'pasien')
            response.set_cookie('last_login', str(datetime.datetime.now().strftime('%b %d %Y %H:%M:%S')))
            return response
        else:
            messages.info(request, 'username or password may be wrong!')
    
    return render(request, 'pasien_masuk.html', {'halaman_masuk':HalamanMasuk()})

def dokter_masuk(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        
        try:
            dokter = Dokter.objects.get(user=user)
        except Dokter.DoesNotExist:
            dokter = None

        if user != None and dokter != None:
            login(request, user)
            response = HttpResponseRedirect("/dokter/riwayat-penyakit/")
            response.set_cookie('username', username)
            response.set_cookie('user_type', 'dokter')
            response.set_cookie('last_login', str(datetime.datetime.now().strftime('%b %d %Y %H:%M:%S')))
            return response
        else:
            messages.info(request, 'username or password may be wrong!')
    
    return render(request, 'dokter_masuk.html', {'halaman_masuk':HalamanMasuk()})
