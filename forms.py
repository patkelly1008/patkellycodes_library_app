from django import forms
from website_app.models import Library
import sqlite3

class BookLibrary(forms.ModelForm):
    class Meta():
        model = Library
        fields = '__all__'

    title = forms.CharField(max_length=256, required=True)
    author = forms.CharField(max_length=256, required=True)
    year = forms.CharField(max_length=4, required=True)
    isbn = forms.CharField(max_length=17, required=True)
    on_hand = forms.BooleanField(widget=forms.HiddenInput(), required=True, initial=True)
    library_objects = Library.objects
    library = library_objects.order_by('title').filter(on_hand=True)
    checked_out = library_objects.order_by('title').filter(on_hand=False)
