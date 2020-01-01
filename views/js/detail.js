/**
 * initialize the detail page information
 */
function initDetailInfo() {
    let query_url = href + '?allEntities=true';
    axios.get(query_url)
        .then(function (response) {
            initViews(response.data);
        });
}

/**
 * initialize views by network data
 * @param result
 */
function initViews(result) {
    let div_content = document.querySelector('#div_content');

    // create img element
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

    // create text
    if (first_path == 'authors') {
        addText(div_content, 'Id', result.id);
        addText(div_content, 'Name', result.name);
        addText(div_content, 'Create Date', result.createdAt);
        addText(div_content, 'Update Date', result.updatedAt);
        div_content.appendChild(document.createElement('br'));
        addText(div_content, 'Book List', '');

        // create book list in authors detail page
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

        // create author list in books detail page
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

/**
 * create text node
 * @param div
 * @param key
 * @param text
 */
function addText(div, key, text) {
    let node = document.createTextNode(key + ' : ' + text);
    div.appendChild(node);
    div.appendChild(document.createElement('br'));
}

/**
 * create item of list
 * @param container
 * @param data
 */
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

    // create title in item
    if (first_path == 'authors') {
        div.appendChild(document.createTextNode(data.title));
    } else if (first_path == 'books') {
        div.appendChild(document.createTextNode(data.name));
    } else if (first_path == 'users') {
        div.appendChild(document.createTextNode('Book Id : ' + data.BookId));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Due Date : ' + data.dueDate));
    }

    // create a element in item
    // set url of a element
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

/**
 * event of button for change
 * enter change page
 */
function detailChange() {
    window.location.href = href + '/change';
}

/**
 * event of button for delete
 * delete item
 */
function detailDelete() {
    let dialog = confirm("Delete?");
    if (dialog == true) {
        axios.delete(href)
            .then(function (response) {
                window.location.href = base_url + '/' + first_path;
            });
    }
}

/**
 * event of button for add
 * enter add page
 */
function detailAdd() {
    if (first_path == 'authors') {
        window.location.href = href + '/books';
    } else if (first_path == 'books') {
        window.location.href = href + '/authors';
    } else if (first_path == 'users') {
        window.location.href = href + '/loans';
    }
}

/**
 * initialize button for addition
 */
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

/**
 * initialize loan list of the user
 */
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

// initialize detail information
initDetailInfo();
// initialize button for addition
initAdditionButton();