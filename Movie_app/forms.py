from django import forms
from .models import Movie

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = [
            'name',
            'publication_year',
            'supported_languages',
            'budget',
        ]

        label = {
            'publication_year' : 'Publication Year',
            'supported_languages': 'Supported Languages',
        }