from django.urls import path
from . import views

urlpatterns = [
    path("" , views.antarmuka_pasien, name="index"),
]