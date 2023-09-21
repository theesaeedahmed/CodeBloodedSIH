"""
URL configuration for hello project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home import views

admin.site.site_header = "poulami Admin"
admin.site.site_title = "poulami Admin Portal"
admin.site.index_title = "Welcome to poulami Researcher Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name='home'),
    path('index(draft).html',views.draft,name='get started'),
    path('page.html',views.page,name='pages'),
    path('mainformdivorce.html',views.mainformdivorce,name='mainformdivorce'),
    path('api/classify/', views.classify, name='classify'),
    path('Cruelty.html',views.cruelty,name='cruelty'),
    path('Adultery.html',views.adultary,name='adultary'),
    path('Mutual Consent.html',views.mutual,name='mutual'),
    path('signin.html',views.user_login,name='signin'),
    # path('signup.html',views.user_signup,name='signup')
]
    # path('about',views.about,name='about'),
