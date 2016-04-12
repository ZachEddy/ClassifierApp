from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.http import JsonResponse

# Create your views here.

def index(request):
		print request
		if request.method == 'POST':
			print "A post request was made!"

			handle_uploaded_file(request.FILES['croppedImage'])

			print request.FILES['croppedImage']
			return JsonResponse({'foo':'bar'})

		
		return render(request, "classifier.html", {'type':'this is a plan'})


def handle_uploaded_file(f):
    with open('name.png', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)