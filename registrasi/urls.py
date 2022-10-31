from django.urls import path
from . import views

urlpatterns = [
    path("halaman-registrasi/", views.halaman_registrasi, name="halaman_registrasi"),
    path("registrasi-pasien/" , views.registrasi_pasien, name="registrasi_pasien"),
    path("registrasi-dokter/" , views.registrasi_dokter, name="registrasi_dokter"),
    path("halaman-masuk/", views.halaman_masuk, name="halaman_masuk"),
    path("pasien-masuk/", views.pasien_masuk, name="pasien_masuk"),
    path("dokter-masuk/", views.dokter_masuk, name="dokter_masuk"),
    path("logout/", views.logout_user, name='logout'),
]
