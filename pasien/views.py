from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import HttpResponse, render
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
        nama_dokter = request.POST.get("dokter")

        try:
            user = User.objects.filter(username=nama_dokter)
        except User.DoesNotExist:
            user = None

        if user != None:
            try:
                dokter = Dokter.objects.filter(user=user[0])
            except Dokter.DoesNotExist:
                dokter = None

        tanggal = request.POST.get("tanggal")
        tema = request.POST.get("tema")
        deskripsi = request.POST.get("deskripsi")

        if user != None and dokter != None:
            # membuat keluhan
            keluhan = Keluhan.objects.create(
                pasien=pasien,
                dokter=dokter[0],

                tanggal=tanggal,
                tema=tema,
                deskripsi=deskripsi
            )

            # menyimpan keluhan
            keluhan.save()

            messages.success(request, 'Keluhan Anda telah dikirim ke dokter yang Anda pilih!')
            return HttpResponseRedirect(reverse("pasien:keluhan"))
        else:
            messages.info(request, 'Keluhan Anda gagal dikirim!')
            return HttpResponseRedirect(reverse("pasien:keluhan"))
    else:
        context = {"pasien":pasien, "rincian_keluhan":RincianKeluhan()}
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

def cari_pengguna(request, id):
    try:
        pasien = Pasien.objects.filter(pk=id)
        nama_pengguna = pasien[0].user.username
    except (IndexError, Pasien.DoesNotExist):
        nama_pengguna = None

    if nama_pengguna == None:
        try:
            dokter = Dokter.objects.filter(pk=id)
            nama_pengguna = dokter[0].user.username
        except (IndexError, Dokter.DoesNotExist):
            nama_pengguna = None

    paket = {"nama_pengguna": nama_pengguna}

    return JsonResponse(paket)

@login_required(login_url='/registrasi/halaman-masuk/')
def log_out(request):
    logout(request)

    response = HttpResponseRedirect(reverse('halaman_utama:index'))
    response.delete_cookie('username')
    response.delete_cookie('last_login')
    
    return response
