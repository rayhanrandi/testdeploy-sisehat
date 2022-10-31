from django.shortcuts import render
from dokter.forms import PenyakitForm
from dokter.models import Penyakit

from django.shortcuts import render, redirect

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_user_model

from django.contrib.auth.models import User
from registrasi.models import Pasien, Dokter

from django.contrib.auth.decorators import login_required

from django.core import serializers

from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound


# Create your views here.


# @login_required(login_url='/login')
def show_penyakit(request):
    pasien = Pasien.objects.all()
    data_penyakit = Penyakit.objects.all()
    form = PenyakitForm(request.POST)
    context = {
        'list_penyakit': data_penyakit,
        'list_pasien': pasien,
        'form': form,
    }
    return render(request, 'riwayat_penyakit.html', context)

# @login_required(login_url='/login')
def get_penyakit_pasien(request, pasien):
    pasien = Pasien.objects.get(nomor_induk_kependudukan=pasien)
    data_penyakit = serializers.serialize("json", Penyakit.objects.filter(user=pasien))
    return HttpResponse(data_penyakit, content_type="application/json")

# @login_required(login_url='/login')
def add_penyakit(request, pasien):
    # pasien = Pasien.objects.get(nomor_induk_kependudukan=nik)
    form = PenyakitForm(request.POST)

    if request.method == 'POST':
        if form.is_valid():
            penyakit = form.save(commit=False)
            penyakit.pasien = Pasien.objects.get(nomor_induk_kependudukan=pasien)
            penyakit.dokter = Dokter.objects.get(user=request.user)
            penyakit.save()
            return show_penyakit(request)

        return HttpResponseNotFound()        
    return HttpResponseNotFound()

# @login_required(login_url='/login')
def toggle_penyakit(request, id):
    penyakit = Penyakit.objects.get(id=id)
    if penyakit.sembuh:
        penyakit.sembuh = False
    else:
        penyakit.sembuh = True
    penyakit.save()
    return show_penyakit(request)