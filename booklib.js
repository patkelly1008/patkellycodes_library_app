window.onload = function() {
    document.getElementById('id_library').onclick = library_select;
    document.getElementById('id_check_out').onclick = check_out_select;
    document.getElementById('check_out_btn').onclick = check_out;
    document.getElementById('return_btn').onclick = return_book;
    document.getElementById('update_btn').onclick = update_selected;
    document.getElementById('delete_btn').onclick = delete_selected;
    document.getElementById('clear_btn').onclick = clear_selected;
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
};

function library_select(event){
    document.getElementById('id_check_out').selectedIndex = -1;
    return_btn.disabled = true;
    var book = event.target;
    var book_properties = book.value.split("|");
    var book_title = book_properties[0];
    var book_author = book_properties[1];
    var book_year = book_properties[2];
    var book_isbn = book_properties[3];
    document.getElementById('id_title').value = book_title;
    document.getElementById('id_author').value = book_author;
    document.getElementById('id_year').value = book_year;
    document.getElementById('id_isbn').value = book_isbn;
    if (book_title.value != '' && book_author.value != '' && book_year.value != '' && book_isbn.value != '') {
        check_out_btn.disabled = false;
        update_btn.disabled = false;
        delete_btn.disabled = false;
    }
    else {
        check_out_btn.disabled = true;
        update_btn.disabled = true;
        delete_btn.disabled = true;
    }
};

function check_out_select(event){
    document.getElementById('id_library').selectedIndex = -1;
    check_out_btn.disabled = true;
    update_btn.disabled = true;
    delete_btn.disabled = true;
    var book = event.target;
    var book_properties = book.value.split("|");
    var book_title = book_properties[0];
    var book_author = book_properties[1];
    var book_year = book_properties[2];
    var book_isbn = book_properties[3];
    document.getElementById('id_title').value = book_title;
    document.getElementById('id_author').value = book_author;
    document.getElementById('id_year').value = book_year;
    document.getElementById('id_isbn').value = book_isbn;
    if (book_title.value != '' && book_author.value != '' && book_year.value != '' && book_isbn.value != '') {
        return_btn.disabled = false;
    }
    else {
        return_btn.disabled = true;
        
    }
};

function check_out(event){
    var selected = document.getElementById('id_library');
    var book_id = selected.options[selected.selectedIndex].dataset.id;
    var url = document.getElementById('library_app_url').value;
    var book_title = document.getElementById('id_title').value;
    var book_author = document.getElementById('id_author').value;
    var book_year = document.getElementById('id_year').value;
    var book_isbn = document.getElementById('id_isbn').value;
    $.ajax({
        type: 'POST',
        url: url,
        data: {'book_id': book_id, 'book_title': book_title, 'book_author': book_author, 'book_year': book_year, 'book_isbn': book_isbn, 'action': 'CHECKOUT'},
        success: function(result) {
            window.location.reload();
        },
        error: function() {
            alert("Check out has failed.")
        }
    });
};

function return_book(event){
    var selected = document.getElementById('id_check_out');
    var book_id = selected.options[selected.selectedIndex].dataset.id;
    var url = document.getElementById('library_app_url').value;
    var book_title = document.getElementById('id_title').value;
    var book_author = document.getElementById('id_author').value;
    var book_year = document.getElementById('id_year').value;
    var book_isbn = document.getElementById('id_isbn').value;
    $.ajax({
        type: 'POST',
        url: url,
        data: {'book_id': book_id, 'book_title': book_title, 'book_author': book_author, 'book_year': book_year, 'book_isbn': book_isbn, 'action': 'RETURN'},
        success: function(result) {
            window.location.reload();
        },
        error: function() {
            alert("Return has failed.")
        }
    });
};

function update_selected(event){
    var selected = document.getElementById('id_library');
    var book_id = selected.options[selected.selectedIndex].dataset.id;
    var url = document.getElementById('library_app_url').value;
    var book_title = document.getElementById('id_title').value;
    var book_author = document.getElementById('id_author').value;
    var book_year = document.getElementById('id_year').value;
    var book_isbn = document.getElementById('id_isbn').value;
    $.ajax({
        type: 'POST',
        url: url,
        data: {'book_id': book_id, 'book_title': book_title, 'book_author': book_author, 'book_year': book_year, 'book_isbn': book_isbn, 'action': 'UPDATE'},
        success: function(result) {
            window.location.reload();
        },
        error: function() {
            alert("Update has failed.")
        }
    });
};

function delete_selected(event){
    var selected = document.getElementById('id_library');
    var book_id = selected.options[selected.selectedIndex].dataset.id;
    var url = document.getElementById('library_app_url').value;
    $.ajax({
        type: 'POST',
        url: url,
        data: {'book_id': book_id, 'action': 'DELETE'},
        success: function(result) {
            window.location.reload();
        },
        error: function() {
            alert("Delete has failed.")
        }
    });
};

function clear_selected(event){
    check_out_btn.disabled = true;
    return_btn.disabled = true;
    update_btn.disabled = true;
    delete_btn.disabled = true;
    search_btn.disabled = true;
};
