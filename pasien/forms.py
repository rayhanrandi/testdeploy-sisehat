from django import forms

from pasien.models import Keluhan


class DateInput(forms.DateInput):
    input_type = "date"


class RincianKeluhan(forms.ModelForm):
    tanggal = forms.DateField(widget=DateInput)


    class Meta:
        model = Keluhan; fields = ("tanggal", "tema", "deskripsi")
