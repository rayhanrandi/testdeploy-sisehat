from django.urls import path
from . import views

app_name = 'halaman_utama'
urlpatterns = [
    path("" , views.home, name="landing_page"),
    path('feedback', views.list_feedback, name='feedback'),
    path('json_function', views.json_funct, name='json_function'),
    path('fetch_feedback', views.fetch_post_feedback, name='fetch_feedback'),
]
