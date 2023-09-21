from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .classify import classify_text  # Import your classify function
from home.models import login

# Create your views here.
def index(request):
    # context={
    #     'variable':'this is sent'
    # }
    return render(request,'index(landing).html')
    # return HttpResponse('this is about')

def draft(request):
    return render(request,'index(draft).html')

def page(request):
    return render(request,'page.html')

def user_login(request):
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        print(email,password)
        signin1=login(email=email,password=password)
        signin1.save()
        print(email,password)
    return render(request,'signin.html')

def mainformdivorce(request):
    return render(request,'mainformdivorce.html')


@csrf_exempt  # Use this decorator to disable CSRF protection for simplicity (not recommended for production)
def classify(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input', '')
        predicted_category = classify_text(user_input)

        # Return the prediction result as JSON
        return JsonResponse({'predicted_category': predicted_category})

    return JsonResponse({'error': 'Invalid request'}, status=400)

def cruelty(request):
    return render(request,'cruelty.html')

def adultary(request):
    return render(request,'adultary.html')

def mutual(request):
    return render(request,'mutual.html')
