from django.shortcuts import render

from registrasi.forms import MendaftarDokter, MendaftarPasien

def index(request):
    form_mendaftar_pasien = MendaftarPasien()
    form_mendaftar_dokter = MendaftarDokter()

    context = {
        'form_mendaftar_pasien':form_mendaftar_pasien,
        'form_mendaftar_dokter':form_mendaftar_dokter
    }

    return render(request, "registrasi.html", context)
