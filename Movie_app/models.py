from django.db import models

# Create your models here.
class Movie(models.Model):
    LANGUAGE_CHOICES = [
        ('EN', 'English'),
        ('BN' , 'Bangla'),
        ('HI' , 'Hindi')
    ]

    name = models.CharField(max_length=200)
    publication_year = models.IntegerField()
    supported_languages = models.CharField(max_length=2, choices= LANGUAGE_CHOICES)
    budget = models.PositiveBigIntegerField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name