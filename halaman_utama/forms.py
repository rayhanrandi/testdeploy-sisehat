from django import forms
from halaman_utama.models import Feedback


class FormFeedback(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['name', 'message']

        widgets = {
            'name': forms.TextInput(attrs={'class': 'input', 'placeholder': 'Name'}),
            'message': forms.Textarea(attrs={'class': 'input', 'placeholder': 'Message', 'rows': 10, 'cols': 22, 'style': 'resize:none;'})
        }
