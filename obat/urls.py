from django.urls import path
from obat.views import delete_obat, show_obat, create_obat, show_json

app_name = 'obat'

urlpatterns = [
    path('', show_obat, name='show_obat'),
    path('create-obat/', create_obat, name='create_obat'),
    path('delete-obat/<int:id>', delete_obat, name='delete'),
    path('json/', show_json, name='json'),
]