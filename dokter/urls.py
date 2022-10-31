from django.urls import path
from dokter.views import show_penyakit, get_penyakit_pasien, add_penyakit, toggle_penyakit, get_keluhan_pasien, redirect_home

app_name = 'dokter'

urlpatterns = [
    path('riwayat-penyakit/', show_penyakit, name='show_riwayat_penyakit'),
    path('riwayat-penyakit/<str:pasien>', get_penyakit_pasien, name='get_penyakit_pasien'),
    path('add-penyakit/<str:pasien>', add_penyakit, name='add_penyakit'),
    path('toggle-penyakit/<int:id>', toggle_penyakit, name='toggle-penyakit'),
    path('riwayat-keluhan/<str:pasien>', get_keluhan_pasien, name='get_keluhan_pasien'),
    path('home/', redirect_home, name='home')
]
