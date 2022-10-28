from django.shortcuts import render, redirect
from halaman_utama.models import Feedback
from halaman_utama.forms import FormFeedback
from django.http import HttpResponseRedirect, response, JsonResponse
import json
from django.core import serializers
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# def Landing_page(request):
#     return render(request, 'LandingPage.html')


def home(request):
    form = FormFeedback()
    if request.method == 'POST':
        form = FormFeedback(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({
                'msg': 'Success'
            })
    return render(request, "LandingPage.html", {"form": form})


def list_feedback(request):
    feedback = Feedback.objects.all().values()
    response = {'feedback': feedback}
    return render(request, "feedback_section.html", response)


def json_funct(request):
    feedback = Feedback.objects.all()
    jsonFeedback = serializers.serialize('json', feedback)
    return HttpResponse(jsonFeedback, content_type="application/json")

@csrf_exempt
def fetch_post_feedback(request):
    print(request.method)
    print(request.body)
    data = json.loads(request.body)
    form = Feedback()
    form.name = data["username"]
    form.message = data["message"]
    form.save()
    return JsonResponse({"status" : "berhasil"})
