from datetime import datetime
from django import forms

from pasien.models import Keluhan


class DateInput(forms.DateInput):
    input_type = "date"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.attrs.setdefault("min", "1970-02-02")
        self.attrs.setdefault("max", f"{datetime.today().date()}")


class RincianKeluhan(forms.ModelForm):
    tanggal = forms.DateField(widget=DateInput)


    class Meta:
        model = Keluhan; fields = ("tanggal", "tema", "deskripsi")
