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
    if (first_path == 'books') {
        let query_url = base_url + '/check/authorId/' + bookid;
        axios.get(query_url)
            .then(function (response) {
                if (response.data.check) {
                    addBookById();
                } else {
                    alert('Sorry. Author Id : ' + bookid + ' does not exist.');
                }
            });
    } else {
        let query_url = base_url + '/check/bookId/' + bookid;
        axios.get(query_url)
            .then(function (response) {
                if (response.data.check) {
                    addBookById();
                } else {
                    alert('Sorry. Book Id : ' + bookid + ' does not exist.');
                }
            });
    }
}

function addBookById() {
    let bookid = document.querySelector('#input_book_id').value;
    let query_url = href + '/' + bookid;
    let params = {};
    if (first_path == 'users') {
        let book_due_date = getDueDateBySelect();
        params = {
            dueDate: book_due_date,
        };
    }
    axios.post(query_url, params)
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
    let params = {};
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

function initSelectTime() {
    if (first_path == 'users') {
        let select_year = document.querySelector('#select_year');
        for (let i = 2000; i < 2100; i++) {
            let option = document.createElement('option');
            option.setAttribute('class', 'option_year');
            option.setAttribute('value', i);
            option.appendChild(document.createTextNode(i));
            select_year.appendChild(option);
        }

        let select_month = document.querySelector('#select_month');
        for (let i = 1; i < 13; i++) {
            let option = document.createElement('option');
            option.setAttribute('class', 'option_month');
            option.setAttribute('value', i);
            option.appendChild(document.createTextNode(i));
            select_month.appendChild(option);
        }

        let select_day = document.querySelector('#select_day');
        for (let i = 1; i < 32; i++) {
            let option = document.createElement('option');
            option.setAttribute('class', 'option_day');
            option.setAttribute('value', i);
            option.appendChild(document.createTextNode(i));
            select_day.appendChild(option);
        }
    }
}

initSelectTime();

function getDueDateBySelect() {
    let y = 2000;
    let m = 1;
    let d = 1;
    let years = document.querySelectorAll('.option_year');
    years.forEach(function (year) {
        if (year.selected) {
            y = year.value;
        }
    });

    let months = document.querySelectorAll('.option_month');
    months.forEach(function (month) {
        if (month.selected) {
            m = month.value;
        }
    });

    let days = document.querySelectorAll('.option_day');
    days.forEach(function (day) {
        if (day.selected) {
            d = day.value;
        }
    });
    return '' + y + '-' + m + '-' + d;
}
