from django.shortcuts import render
from django.http import HttpResponse
from website_app.models import Library
from website_app.forms import 

def library_app(request):
    form = BookLibrary()
    if request.method == "POST":
        action = request.POST['action']
        if action == "CHECKOUT":
            book_id = request.POST['book_id']
            form = BookLibrary(request.POST)
            form.library_objects.filter(pk=book_id).update(on_hand=False)
            return HttpResponse("Success")
        if action == "RETURN":
            book_id = request.POST['book_id']
            form = BookLibrary(request.POST)
            form.library_objects.filter(pk=book_id).update(on_hand=True)
            return HttpResponse("Success")
        elif action == "DELETE":
            book_id = request.POST['book_id']
            form.library_objects.filter(pk=book_id).delete()
            return HttpResponse("Success")
        elif action == "UPDATE":
            book_id = request.POST['book_id']
            book_title = request.POST['book_title']
            book_author = request.POST['book_author']
            book_year = request.POST['book_year']
            book_isbn = request.POST['book_isbn']
            form = BookLibrary(request.POST)
            form.library_objects.filter(pk=book_id).update(title=book_title, author=book_author, year=book_year, isbn=book_isbn)
            return HttpResponse("Success")
        else:
            form = BookLibrary(request.POST)
            if form.is_valid():
                form.save(commit=True)
                return render(request, 'booklib_app/booklib.html', {'form':form})
    form.library = form.library_objects.order_by('title').filter(on_hand=True)
    form.checked_out = form.library_objects.order_by('title').filter(on_hand=False)
    return render(request, 'booklib_app/booklib.html', {'form':form})
