from django import forms
from dokter.models import Penyakit

class PenyakitForm(forms.ModelForm):
    class Meta:
        model = Penyakit
        fields = {
            'nama_penyakit',
            'deskripsi_keluhan',
        }
