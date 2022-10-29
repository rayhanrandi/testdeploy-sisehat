from django.urls import path
from . import views

urlpatterns = [
    path("riwayat/" , views.riwayat, name="riwayat"),
    path("keluhan/" , views.keluhan, name="keluhan"),
    path("mengeluh/" , views.mengeluh, name="mengeluh"),
    path("daftar-keluhan/", views.daftar_keluhan, name="daftar_keluhan"),
    path("daftar-dokter/", views.daftar_dokter, name="daftar_dokter"),
    path("cari-pengguna/", views.cari_pengguna, name="cari_pengguna"),
    path("log-out/", views.log_out, name="log_out"),
]
