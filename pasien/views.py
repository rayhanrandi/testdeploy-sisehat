from django.shortcuts import render

def antarmuka_pasien(request):
    return render(request, "pasien.html", {})
