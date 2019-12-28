function showAddBook() {
    document.querySelector('#content_add_book').setAttribute('class', 'display_block');
    document.querySelector('#content_add_new_book').setAttribute('class', 'display_none');
}

function showAddNewBook() {
    document.querySelector('#content_add_book').setAttribute('class', 'display_none');
    document.querySelector('#content_add_new_book').setAttribute('class', 'display_block');
}

function addBook() {
    let bookid = document.querySelector('#input_book_id').value;
    let query_url = href + '/' + bookid;
    axios.post(query_url)
        .then(function (response) {
            alert('ok');
            window.location.href = base_url + '/' + url_pathname[1] + '/' + url_pathname[2];
        })
        .catch(function (error) {
            alert(error.toString());
        })
}

function addNewBook() {
    let book_title = document.querySelector('#input_book_title').value;
    let query_url = href;
    params = {};
    if (first_path == 'authors') {
        let book_isbn = document.querySelector('#input_book_isbn').value;
        params = {
            bookTitle: book_title,
            bookISBN: book_isbn,
        };
    } else if (first_path == 'books') {
        params = {
            name: book_title,
        };
    }
    axios.post(query_url, params)
        .then(function (response) {
            alert('ok');
            window.location.href = base_url + '/' + url_pathname[1] + '/' + url_pathname[2];
        })
        .catch(function (error) {
            alert(error.toString());
        });
}