from django.urls import path
from . import views

urlpatterns = [
    path("index/" , views.antarmuka_pasien, name="index"),
    path("membuat-keluhan/" , views.keluhan_pasien, name="keluhan_pasien"),
]
