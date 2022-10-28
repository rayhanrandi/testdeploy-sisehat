from django.urls import path
from . import views

urlpatterns = [
    path("pasien/" , views.daftar_pasien, name="daftar_pasien"),
    path("dokter/" , views.daftar_dokter, name="daftar_dokter"),
]
