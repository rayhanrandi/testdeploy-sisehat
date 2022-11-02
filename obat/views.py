import datetime
from django.shortcuts import redirect, render
from obat.models import Obat
from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from obat.forms import formobat
from django.urls import reverse
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
@login_required(login_url='/registrasi/halaman-masuk/')
def obat(request):
    if request.COOKIES.get('user_type') == 'dokter':
        return render(request, "obat.html")
    else:
        return redirect('registrasi:halaman_registrasi')

@login_required(login_url='/registrasi/halaman-masuk/')
def show_obat(request):
    if request.COOKIES.get('user_type') == 'dokter':
        form = formobat(request.POST)
        data_obat = Obat.objects.all()
        context = {
        'list_todo': data_obat,
        }
        return render(request, "obat.html", context)
    else:
        return redirect('registrasi:halaman_registrasi')

@csrf_exempt
@login_required(login_url='/registrasi/halaman-masuk/')
def create_obat(request):
    if request.COOKIES.get('user_type') == 'dokter':
        if request.method == 'POST':
            nama = request.POST.get('nama')
            produsen = request.POST.get('produsen')
            deskripsi = request.POST.get('deskripsi')
            efek_samping = request.POST.get('efek_samping')
            obat = Obat.objects.create(
                nama=nama, produsen=produsen, deskripsi=deskripsi, efek_samping=efek_samping)
            serialize_json = serializers.serialize('json', [obat])
            print(serialize_json)
            return HttpResponse(serialize_json)

        return JsonResponse({'error': "Not an ajax request"}, status=404)
    else:
        return redirect('registrasi:halaman_registrasi')
    
@login_required(login_url='/registrasi/halaman-masuk/')
def delete_obat(request, id):
    if request.COOKIES.get('user_type') == 'dokter':
        data = Obat.objects.get(pk = id)
        data.delete()
        response = HttpResponseRedirect(reverse("obat:show_obat"))
        return response
    else:
        return redirect('registrasi:halaman_registrasi')

@login_required(login_url='/registrasi/halaman-masuk/')
def show_json(request):
    if request.COOKIES.get('user_type') == 'dokter':
        data_obat = Obat.objects.all()
        return HttpResponse(serializers.serialize("json", data_obat), content_type="application/json")
    else:
        return redirect('registrasi:halaman_registrasi')