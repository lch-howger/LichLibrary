function updateDetail() {
    let xhttp = new XMLHttpRequest();
    let query_url = href + '?allEntities=true';
    xhttp.open('GET', query_url);
    xhttp.addEventListener('load', function () {
        initViews(this.response);
    });
    xhttp.send();
}

updateDetail();

function initViews(response) {
    let result = JSON.parse(response);
    let div_content = document.querySelector('#div_content');

    let img = document.createElement('img');
    if (first_path == 'authors') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_author.png');
    } else if (first_path == 'books') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_book.jpg');
    } else if (first_path == 'users') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_author.png');
    } else if (first_path == 'loans') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_book.jpg');
    }
    img.setAttribute('id', 'img_detail');
    if (result.imgUrl != null) {
        img.setAttribute('src', result.imgUrl);
    }

    div_content.appendChild(img);

    div_content.appendChild(document.createElement('br'));

    if (first_path == 'authors') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Name', result.name);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Book List', '');

        let div_container = document.createElement('div');
        div_container.setAttribute('id', 'div_detail_list')
        result.Books.forEach(function (book) {
            addItem(div_container, book);
        });
        div_content.appendChild(div_container);

    } else if (first_path == 'books') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Title', result.title);
        addText(div_content, 'Isbn', result.isbn);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Author List', '');

        let div_container = document.createElement('div');
        div_container.setAttribute('id', 'div_detail_list')
        result.Authors.forEach(function (author) {
            addItem(div_container, author);
        });
        div_content.appendChild(div_container);
    } else if (first_path == 'users') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Name', result.name);
        addText(div_content, 'Barcode', result.barcode);
        addText(div_content, 'Member Type', result.memberType);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Loan List', '');
    } else if (first_path == 'loans') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Due Date', result.dueDate);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        addText(div_content, 'User Id', result.UserId);
        addText(div_content, 'Book Id', result.BookId);
    }
}

function addText(div, key, text) {
    let node = document.createTextNode(key + ' : ' + text);
    div.appendChild(node);
    div.appendChild(document.createElement('br'));
}

function addItem(container, data) {
    let div = document.createElement('div');
    div.setAttribute('class', 'div_detail_list_item');
    let img = document.createElement('img');
    if (first_path == 'authors') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_book.jpg');
    } else if (first_path == 'books') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_author.png');
    } else if (first_path == 'users') {
        img.setAttribute('src', '//127.0.0.1:3000/views/image/icon_book.jpg');
    }
    img.setAttribute('class', 'img_detail_list');
    if (data.imgUrl != null) {
        img.setAttribute('src', data.imgUrl);
    }
    div.appendChild(img);

    if (first_path == 'authors') {
        div.appendChild(document.createTextNode(data.title));
    } else if (first_path == 'books') {
        div.appendChild(document.createTextNode(data.name));
    } else if (first_path == 'users') {
        div.appendChild(document.createTextNode('Book Id : ' + data.BookId));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Due Date : ' + data.dueDate));
    }

    let a = document.createElement('a');
    let url = '#';
    if (first_path == 'authors') {
        url = base_url + '/books/' + data.id
    } else if (first_path == 'books') {
        url = base_url + '/authors/' + data.id
    } else if (first_path == 'users') {
        url = base_url + '/loans/' + data.id
    }
    a.setAttribute('href', url);
    a.appendChild(div);
    container.appendChild(a);
}

function detailChange() {
    window.location.href = href + '/change';
}

function detailDelete() {
    let dialog = confirm("Delete?");
    if (dialog == true) {
        axios.delete(href)
            .then(function (response) {
                window.location.href = base_url + '/' + first_path;
            });
    }
}

function detailAdd() {
    if (first_path == 'authors') {
        window.location.href = href + '/books';
    } else if (first_path == 'books') {
        window.location.href = href + '/authors';
    } else if (first_path == 'users') {
        window.location.href = href + '/loans';
    }
}

function initAdditionButton() {
    let button = document.querySelector('#btn_detail_addition');
    if (first_path == 'authors') {
        button.setAttribute('value', 'Add Book For Author');
    } else if (first_path == 'books') {
        button.setAttribute('value', 'Add Author For Book');
    } else if (first_path == 'users') {
        button.setAttribute('value', 'Add Loan For User')
        initUserLoans();
    } else if (first_path == 'loans') {
        button.setAttribute('class', 'display_none');
    }
}

initAdditionButton();

function initUserLoans() {
    let query_url = href + '/loans/list';
    axios.get(query_url)
        .then(function (response) {
            let div_container = document.createElement('div');
            div_container.setAttribute('id', 'div_detail_list')
            response.data.forEach(function (loan) {
                //addItem(div_container, loan.BookId + '/#/' + loan.dueDate);
                addItem(div_container, loan);
            });
            div_content.appendChild(div_container);
        });
}