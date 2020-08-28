from django.db import models

class Library(models.Model):
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)
    year = models.CharField(max_length=4)
    isbn = models.CharField(max_length=17)
    on_hand = models.BooleanField(default=True)

    def __str__(self):
        return self.title
