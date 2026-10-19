from django.urls import path
from . import views

urlpatterns = [
    path('',views.movie_register,name='movie_register'),
    path('movie/<int:pk>/delete/', views.delete_movie, name='delete_movie'),
    path('movie/<int:pk>/edit/', views.edit_movie, name='edit_movie'),
]