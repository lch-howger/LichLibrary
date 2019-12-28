function updateDetail() {
    let xhttp = new XMLHttpRequest();
    let query_url = href + '?allEntities=true';
    xhttp.open('GET', query_url);
    xhttp.addEventListener('load', function () {

        initViews(this.response);


        // let text = document.createTextNode(result);
        // div_content.appendChild(text);
    });
    xhttp.send();
}

updateDetail();

function initViews(response) {
    let div_content = document.querySelector('#div_content');

    let img = document.createElement('img');
    img.setAttribute('src', '//127.0.0.1:3000/views/image/img06.jpg');
    img.setAttribute('id', 'img_detail');
    div_content.appendChild(img);

    let result = JSON.parse(response);
    div_content.appendChild(document.createElement('br'));

    if (first_path == 'authors') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Name', result.name);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Book List', '');

        let div_container = document.createElement('div');
        div_container.setAttribute('id','div_detail_list')
        result.Books.forEach(function (book) {
            addItem(div_container, book.title);
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
    } else if (first_path == 'users') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Name', result.name);
        addText(div_content, 'Barcode', result.barcode);
        addText(div_content, 'Member Type', result.memberType);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Loan List', '');
    }
}

function addText(div, key, text) {
    let node = document.createTextNode(key + ' : ' + text);
    div.appendChild(node);
    div.appendChild(document.createElement('br'));
}

function addItem(container, text) {
    let div = document.createElement('div');
    div.setAttribute('class', 'div_detail_list_item');
    let img = document.createElement('img');
    img.setAttribute('src', '//127.0.0.1:3000/views/image/img06.jpg');
    img.setAttribute('class', 'img_detail_list');
    div.appendChild(img);
    div.appendChild(document.createTextNode(text));

    container.appendChild(div);
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
            let div_user_loans = document.querySelector('#div_user_loans');
            div_user_loans.innerHTML = '';
            let result = JSON.stringify(response.data, null, 4);
            div_user_loans.innerText = result;
        });
}