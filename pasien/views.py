import imp
from urllib import response
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponseRedirect
from django.shortcuts import HttpResponse, redirect, render
from django.urls import reverse

from pasien.forms import RincianKeluhan
from pasien.models import Keluhan
from registrasi.models import Dokter, Pasien

def riwayat(request):
    try:
        dokter = Dokter.objects.get(user=request.user)
    except (TypeError, Dokter.DoesNotExist):
        dokter = None

    context = {'dokter':dokter}
    return render(request, "riwayat.html", context)

@login_required(login_url='/registrasi/halaman-masuk/')
def keluhan(request):
    try:
        pasien = Pasien.objects.get(user=request.user)
    except Pasien.DoesNotExist:
        pasien = None

    context = {'pasien':pasien, 'rincian_keluhan':RincianKeluhan()}
    return render(request, "keluhan.html", context)

@login_required(login_url='/registrasi/halaman-masuk/')
def mengeluh(request):
    try:
        pasien = Pasien.objects.get(user=request.user)
    except Pasien.DoesNotExist:
        pasien = None

    if request.method == "POST" and RincianKeluhan(request.POST).is_valid():
        dokter = request.POST.get("dokter")

        tanggal = request.POST.get("tanggal")
        tema = request.POST.get("tema")
        deskripsi = request.POST.get("deskripsi")

        # membuat keluhan
        keluhan = Keluhan.objects.create(
            pasien=pasien,
            dokter=dokter,

            tanggal=tanggal,
            tema=tema,
            deskripsi=deskripsi
        )

        # menyimpan keluhan
        keluhan.save()

        messages.success(request, 'Keluhan Anda telah dikirim ke dokter yang Anda dipilih!')
        return redirect('pasien:keluhan')
    else:
        context = {'pasien':pasien, 'rincian_keluhan':RincianKeluhan()}
        return render(request, "keluhan.html", context)

@login_required(login_url='/registrasi/halaman-masuk/')
def daftar_keluhan(request):
    try:
        pasien = Pasien.objects.get(user=request.user)
    except Pasien.DoesNotExist:
        pasien = None
        
    daftar_keluhan = Keluhan.objects.filter(pasien=pasien)
    
    return HttpResponse(serializers.serialize("json", daftar_keluhan), content_type="application/json")

def daftar_dokter(request):
    try:
        dokter = Dokter.objects.all()
    except Dokter.DoesNotExist:
        dokter = None
    
    return HttpResponse(serializers.serialize("json", dokter), content_type="application/json")

def cari_pengguna(request):
    pass

@login_required(login_url='/registrasi/halaman-masuk/')
def log_out(request):
    logout(request)

    response = HttpResponseRedirect(reverse('halaman_utama:index'))
    response.delete_cookie('username')
    response.delete_cookie('last_login')
    
    return response
