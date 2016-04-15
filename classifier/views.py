from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.http import JsonResponse

from network.__main__ import classify_user_image

def index(request):
		print request
		if request.method == 'POST':

			handle_uploaded_file(request.FILES['croppedImage'])

			probs = classify_user_image()

			return JsonResponse({
				'Airplane': probs[0],
				'automobile': probs[1],
				'bird': probs[2],
				'cat': probs[3],
				'deer': probs[4],
				'dog': probs[5],
				'frog': probs[6],
				'horse': probs[7],
				'ship': probs[8],
				'truck': probs[9],
				})
			
		return render(request, "classifier.html", {'type':'this is a plan'})


def handle_uploaded_file(f):
	with open('image.png', 'wb+') as destination:
		for chunk in f.chunks():
			destination.write(chunk)