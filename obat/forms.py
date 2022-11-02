from django import forms
from django import forms
from obat.models import Obat

class formobat(forms.ModelForm):
    class Meta:
        model = Obat
        fields = ["nama", "produsen", "deskripsi", "efek_samping"]