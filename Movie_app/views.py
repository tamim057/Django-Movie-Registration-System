from django.shortcuts import get_object_or_404,render,redirect
from django.views.decorators.http import require_POST
from .forms import MovieForm
from .models import Movie
# Create your views here.

def movie_register(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('movie_register')
    else:
        form = MovieForm()
    query = request.GET.get('search','')
    movies = Movie.objects.filter(name__icontains=query)
    return render(request , 'movie_register.html', {
        "form":form,
        "query":query,
        'movies':movies,
    })

@require_POST
def delete_movie(request,pk):
    movie = get_object_or_404(Movie, pk=pk)
    movie.delete()
    return redirect('movie_register')

def edit_movie(request,pk):
    movie = get_object_or_404(Movie, pk=pk)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect('movie_register')
    else:
        form = MovieForm(instance=movie)

    return render(request , 'movie_edit.html', {
                'form':form,
                'movie':movie,
    })


