from django.urls import path
from . import views

urlpatterns = [
    path("" , views.Landing_page, name="landing_page")
]